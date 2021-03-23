#!/usr/bin/env bash
mkdir -p ${HOME}/.local/share/applications
mkdir -p ${HOME}/.local/share/icons

cat << EOF > ${HOME}/.local/share/applications/key-box.desktop
[Desktop Entry]
Version=1.0
Name=Key Box
Comment=A self-made password management tool
Exec=$(pwd)/release/key-box-linux-x64/key-box
Icon=key-box
Terminal=false
Type=Application
Categories=Utility;
EOF

cp ./public/icon.png ${HOME}/.local/share/icons/key-box.png
