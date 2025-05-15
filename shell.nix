let
  rust-overlay = builtins.fetchTarball "https://github.com/oxalica/rust-overlay/archive/master.tar.gz";

  pkgs = import <nixpkgs> {
    overlays = [(import rust-overlay)];
    # required for android stuff
    config.android_sdk.accept_license = true;
    config.allowUnfree = true;
  };

  rust-toolchain = pkgs.rust-bin.fromRustupToolchainFile ./toolchain.toml;

  androidComposition = pkgs.androidenv.composeAndroidPackages {
    # compileSdk and targetSdk from `src-tauri/gen/android/app/build.gradle.kts`
    platformVersions = [ "34" ];
    buildToolsVersions = [ "34.0.0" ];
    # systemImageTypes = [ "google_apis_playstore" ];
    abiVersions = [
      "armeabi-v7a"
      "arm64-v8a"
    ];
    includeNDK = true;
    # includeExtras = [
    #   "extras;google;auto"
    # ];
  };
in
pkgs.mkShell {
  nativeBuildInputs = with pkgs; [
    pkg-config
    gobject-introspection
    nodejs
    # java required by android stuff
    jdk21_headless
  ];

  buildInputs = with pkgs; [
    at-spi2-atk
    atkmm
    cairo
    gdk-pixbuf
    glib
    gtk3
    harfbuzz
    librsvg
    libsoup_3
    pango
    webkitgtk_4_1
    openssl
    androidComposition.androidsdk
  ];

  packages = [
    rust-toolchain
  ];

  ANDROID_HOME = "${androidComposition.androidsdk}/libexec/android-sdk";
  NDK_HOME = "${androidComposition.androidsdk}/libexec/android-sdk/ndk-bundle";

  shellHook = ''
    # export .env so vars appear in android gradle scripts
    set -a; source .env; set +a
  '';
}