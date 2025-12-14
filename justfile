n:
    nix develop --command fish -C "set hydro_symbol_start DEV "

db:
  nix develop --command mongod --dbpath l5e-cs/data.local

gen:
    openapi-generator-cli generate \
      -i ./kiosk-cdn-spec/openapi.yaml \
      -g typescript-nestjs-server \
      -o ./kiosk-cdn-server/gen \
      --additional-properties=npmName=@kiosk/cdn-server,supportsES6=true,withInterfaces=true
