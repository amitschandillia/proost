#!/usr/bin/env bash
echo "Enter commit message..."
read msg
git add ~/**/* ~/.documentation/**/*
git status
git commit -m "$msg"
git push
