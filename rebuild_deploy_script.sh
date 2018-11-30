#argument $1 should be the name of the folder/project to pull/rebuild
cd ../$1
echo "Pulling from master for project " $1
git checkout master
git pull
echo "Pulled successfully from master.  Rebuilding"
npm run build
echo "Build complete. Restarting server..."
cd ../node_web_server
npm run restart
echo "Server restarted Successfully"