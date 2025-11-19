n:
    nix develop --command fish -C "set hydro_symbol_start DEV "

gen:
    openapi-generator-cli generate \
      -i ./kiosk-cdn-spec/openapi.yaml \
      -g typescript-nestjs-server \
      -o ./kiosk-cdn-server/gen \
      --additional-properties=npmName=@kiosk/cdn-server,supportsES6=true,withInterfaces=true
