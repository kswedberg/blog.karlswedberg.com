echo "Copying $RSYNC_LOCAL to $RSYNC_REMOTE"
rsync -auvz --progress $RSYNC_LOCAL $RSYNC_REMOTE
