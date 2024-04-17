cd ..
npx nx reset
VITE_CLIENT_BASE_URL= VITE_CLIENT_STORAGE_URL= VITE_CLIENT_ASSET_URL= VITE_CLIENT_PUBLIC_PATH= npx nx run client:test
VITE_CLIENT_BASE_URL= VITE_CLIENT_STORAGE_URL= VITE_CLIENT_ASSET_URL= VITE_CLIENT_PUBLIC_PATH= npx nx run client:build:production

cd dist/apps
zip -r client.zip client
