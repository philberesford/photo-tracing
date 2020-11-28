# photo-tracing
A repository for creating tracings of art

Example usage:
```bash
npm i
lerna bootstrap
lerna run tsc
lerna run start
```

Adding dependencies package:
```bash
# Ref: https://github.com/lerna/lerna/tree/main/commands/add#readme

# Adds the module-1 package to the packages in the 'prefix-' prefixed folders
lerna add module-1 packages/prefix-*

# Install module-1 to module-2
lerna add module-1 --scope=module-2

# Install module-1 to module-2 in devDependencies
lerna add module-1 --scope=module-2 --dev

# Install module-1 to module-2 in peerDependencies
lerna add module-1 --scope=module-2 --peer

# Install module-1 in all modules except module-1
lerna add module-1

# Install babel-core in all modules
lerna add babel-core
```

