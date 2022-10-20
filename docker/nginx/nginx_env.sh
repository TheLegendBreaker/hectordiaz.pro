#!/bin/sh
export DOLLAR='$'
src_dir='/etc/nginx/conf.d/templates'
target_dir='/etc/nginx/conf.d/'
templates=$(ls $src_dir)

for i in $templates
do
	name="${i%.*}"
	template=$src_dir"/"$i

	envsubst < $template > /etc/nginx/conf.d/$name

done

nginx -g "daemon off;"

