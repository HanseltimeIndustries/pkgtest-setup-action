# pkgtest-setup

This supports the use of [pkgtest](https://github.com/HanseltimeIndustries/pkgtest/#readme) in your Github Actions workflow.

This action will mainly create a temporary directory that is on the same volume as your checked out Github project
and then update path variables and tooling (like corepack) to be of an accepted value depending on the github actions runner.

In the event that you do not want to use this action, you can follow the manual notes in the [ci document](https://hanseltimeindustries.github.io/pkgtest/latest/User%20Guide/5-ci/).

## Usage

### Example

This, in general, is the recommended setup as the default inputs are recommended.

```yaml
jobs:
  pkg-test:
    needs:
      - ci-checks
    strategy:
      fail-fast: false
      matrix:
        node-version: [18.x, 20.x]
        # TODO - macos support
        os: ['ubuntu-latest', 'windows-latest']
        pkgManager: ['yarn-v1', 'yarn-berry', 'pnpm', 'npm']
    runs-on: ${{ matrix.os }}
    steps:
      # Check out your repo
      - uses: actions/checkout@v4
      # Make sure node is available
      - uses: actions/setup-node@v4
      # Install your depedencies
      - name: install
        run: |
            <pkg manager> install
      # Your package build
      - name: build
        run: |
            <pkg manager> build
    - id: pkgtest-setup
      uses: hanseltimeindustries/pkgtest-setup-action
      # Run pkgtest with a directive to collect logs
    - name: pkgtest
      run: |
        <pkg manager> pkgtest --collectLogFilesOn error --collectLogFilesStage setup
      # Collect any logs from the --collectLogFilesOn error to troubleshoot failures
    - name: Archive logs on failure
      if: failure()
      uses: actions/upload-artifact@v4
      with:
        name: pkgtest-log-files-${{ matrix.pkgManager }}-${{ matrix.os }}-${{ matrix.node-version }}
        path: ${{ steps.pkgtest-setup.outputs.collet_log_file_folder }}
        retention-days: 1
        include-hidden-files: true
```

### Inputs

```yaml
with:
  # If you want to lock corepack to specific version (default to install it at "latest")
  corepack_version: "0.32.0"
  # If you want to create a folder for pkgtest test projects that is different (maybe there's restrictions on a self-hosted runner)
  # default to "../pkgtest-temp"
  temp_folder: "./tmp"
```

# Development

[Development](./DEVELOPMENT.md)
