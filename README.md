Install dependencies > npm install
Build control > npm run builld
Create subdirectory Solution > go to directory and run:
pac solution init --publisher-name <developer> --publisher-prefix <dev>
Add reference to base (non-solution) folder:
pac solution add-reference --path <path to base control folder>

Build:
unmanaged: msbuild /t:build /restore > solution.zip in solution\bin\debug
managed: msbuild /p:configuration=release > solution.zip in solution\bin\release

To push to Default:
pac pcf push --publisher-prefix <publusher-prefix>

Do not forget to Auth:
pac auth create -u <org url>
pac auth list
pac auth select -i <index>
