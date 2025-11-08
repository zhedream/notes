# volta

是一个 node npm/yarn/pnpm 管理器

全局安装

volta install node
volta install npm
volta install yarn
volta install pnpm

项目级别的指定版本

volta pin node@20.10.0
volta pin yarn@1.22.22

其中似乎：pnpm 属于 Tool binaries available

核心会写 node npm 的垫片，封装了一层来劫持   node, npm 从而实现使用不同版本的node

有两大环境， 全局环境 和 项目环境

默认在全局环境，使用最新版本的 node 等工具

在项目环境使用 volta pin 固定一个 node 版本



PS E:\www\AI-PC> volta -h
The JavaScript Launcher ⚡

Usage: volta.exe [OPTIONS] [COMMAND]

Commands:
  fetch        Fetches a tool to the local machine
  install      Installs a tool in your toolchain
  uninstall    Uninstalls a tool from your toolchain
  pin          Pins your project's runtime or package manager
  list         Displays the current toolchain
  completions  Generates Volta completions
  which        Locates the actual binary that will be called by Volta
  setup        Enables Volta for the current user / shell
  run          Run a command with custom Node, npm, pnpm, and/or Yarn versions
  help         Print this message or the help of the given subcommand(s)

Options:
      --verbose       Enables verbose diagnostics
      --very-verbose  Enables trace-level diagnostics
      --quiet         Prevents unnecessary output
  -v, --version       Prints the current version of Volta
  -h, --help          Print help (see more with '--help')


PS E:\www\AI-PC> volta ls  
⚡️ Currently active tools:

    Node: v22.20.0 (default)
    npm: v11.6.2 (default)
    Yarn: v1.22.22 (default)
    Tool binaries available:
        claude (default)
        vue (default)
        pnpm, pnpx (default)
        rimraf (default)

See options for more detailed reports by running `volta list --help`.


volta which pnpm