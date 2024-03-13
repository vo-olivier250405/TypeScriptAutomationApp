#!/bin/bash

PROJECT_NAME=$1;


mkdir $PROJECT_NAME;
cd $PROJECT_NAME;
bun init . -y;
mkdir src;
mv index.ts src/;


echo '{
  "compilerOptions": {
    // Enable latest features
    "lib": ["ESNext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "jsx": "react-jsx",
    "allowJs": true,

    // Bundler mode
    "moduleResolution": "bundler",
    "allowImportingTsExtensions": true,
    "verbatimModuleSyntax": true,
    "noEmit": true,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false,
    "noUnusedParameters": false,
    "noPropertyAccessFromIndexSignature": false,

    // paths
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*.ts"],
  "exclude": ["node_modules"]
}' > tsconfig.json;

echo '{
  "name": "'"${PROJECT_NAME,,}"'",
  "module": "src/index.ts",
  "type": "module",
  "devDependencies": {
    "@types/bun": "latest"
  },
  "peerDependencies": {
    "typescript": "^5.0.0"
  }

}' > package.json;


clear;
echo -e "\e[42;30mDone!\e[0m A package.json file was saved in the current directory.";
echo " + index.ts";
echo " + .gitignore";
echo " + tsconfig.json (for editor auto-complete)";
echo " + README.md";
echo "";
echo "To get started, run:";
echo -e "\e[1;36m  - cd $PROJECT_NAME/\e[0m";
echo -e "\e[1;36m  - bun run .\e[0m";