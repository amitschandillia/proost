#!/usr/bin/env bash
echo "Enter commit message..."
read msg
git add ~/**/*
git commit -m "$msg"
git push
