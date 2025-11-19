{
  description = "kiosk development shell";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {
    self,
    nixpkgs,
  }: let
    system = "x86_64-linux";

    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {
      buildInputs = with pkgs; [
        # dev dependencies
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
  };
}
