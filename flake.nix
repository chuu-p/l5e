{
  description = "l5e development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    # 1. Add rust-overlay to get a generic Rust toolchain that works on Nix
    rust-overlay = {
      url = "github:oxalica/rust-overlay";
      inputs.nixpkgs.follows = "nixpkgs";
    };
  };

  outputs = {
    self,
    nixpkgs,
    rust-overlay,
    ...
  }: let
    systems = [
      "x86_64-linux"
      "aarch64-linux"
    ];
    forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
  in {
    devShells = forAllSystems (
      system: let
        overlays = [ (import rust-overlay) ];
        pkgs = import nixpkgs {
          inherit system overlays;
          config = {
            allowUnfree = true;
          };
        };

        # 2. Define the Rust toolchain with Android targets enabled
        rustToolchain = pkgs.rust-bin.stable.latest.default.override {
          extensions = [ "rust-src" "rust-analyzer" ];
          targets = [
            "aarch64-linux-android"
            "armv7-linux-androideabi"
            "i686-linux-android"
            "x86_64-linux-android"
          ];
        };

        libs = with pkgs; [
          prettier
          docker
          natscli
          nats-server
          nats-top
          openapi-generator-cli
          nodejs
          pnpm
          deno
          bun # Fixed typo: bunbun -> bun
          tailwindcss
          mongodb-ce
          mongosh

          # tauri
          pkg-config
          # rustup  <-- Removed: Do not use rustup in Nix
          rustToolchain # <-- Added: Use the Nix-native toolchain
          webkitgtk_4_1
          librsvg
          cairo
          pango
          atkmm
          gtk3

          # android
          jdk # Changed jdk25 to jdk (usually 21 LTS) for better compatibility, change back if strictly needed
          libx11
          libpulseaudio
          libpng
          nss
          nspr
          expat
          libdrm
          libxcb
          libxi
          libxkbfile
          libxext
          libbsd
        ];
      in {
        default = pkgs.mkShell {
          buildInputs = libs;

          # 3. Ensure pkg-config finds libraries
          nativeBuildInputs = with pkgs; [ pkg-config ]; 
          
          # 4. Setup environment variables for Tauri/Rust
          LD_LIBRARY_PATH = "${pkgs.lib.makeLibraryPath libs}";
          
          # Setup JAVA_HOME for Android builds
          JAVA_HOME = pkgs.jdk.home;
          
          # Helpful message to verify Rust location
          shellHook = ''
            echo "Environment loaded."
            echo "Rust location: $(which cargo)"
            echo "Java location: $JAVA_HOME"
          '';
        };
      }
    );
  };
}
