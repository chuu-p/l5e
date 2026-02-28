{ pkgs, config, ... }: {
  env.GREET = "determinism";

  packages = [
    pkgs.ncdu
    pkgs.cowsay
  ];

  enterShell = ''
    echo hello ${config.env.GREET}
    ncdu --version
  '';

  git-hooks.hooks = {
    nixfmt.enable = true;
    # Your custom hooks
    # generate-css = {
    #   enable = true;
    #   name = "generate-css";
    #   entry = "devenv tasks run myapp:build";
    # };
  };
}

