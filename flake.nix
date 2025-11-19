{
  description = "kiosk development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = { self, nixpkgs, ... }:
    let
      # Let Nix pick the current host system
      systems = [ "x86_64-linux" "aarch64-linux" ];
      forAllSystems = f: nixpkgs.lib.genAttrs systems (system: f system);
    in {
      devShells = forAllSystems (system:
        let
          pkgs = nixpkgs.legacyPackages.${system};
        in {
          default = pkgs.mkShell {
            buildInputs = with pkgs; [
              prettier
              docker
              natscli
              nats-server
              nats-top
              openapi-generator-cli
              nodejs
              pnpm
              tailwindcss
            ];
          };
        }
      );
    };
}

