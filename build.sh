#!/usr/bin/env -S bash -e

_red="\e[4;91m"
_green="\e[4;92m"
_yellow="\e[4;93m"
_nc="\e[0m"
_title=✨
_task="🛠️ "
_lint=🔍
_test=🧪
_done="✔️ "

clear

echo -e "${_title} ${_red}Sᴍᴏʙᴇᴙ Tᴙᴀᴄᴋᴇᴙ${_nc} ${_title}\n"

echo -e "${_task} ${_yellow}Installing dependencies${_nc}:\n"
pnpm install --frozen-lockfile

echo -e "\n${_lint} ${_yellow}Linting${_nc}:"
pnpm run lint

echo -e "\n${_test} ${_yellow}Testing${_nc}:"
pnpm run test

source docker.sh

echo -e "\n${_done} ${_green}Done${_nc}!\n"

unset _red
unset _green
unset _yellow
unset _nc
unset _title
unset _task
unset _lint
unset _test
unset _done
