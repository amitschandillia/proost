# Let's Encrypt Setup
Follow these steps to set up a free **Let's Encrypt** SSL on an **Ubuntu 16+** server:

 1. Install *Certbot* =&gt; $ `wget https://dl.eff.org/certbot-auto`.

2. Make it executable =&gt; $ `chmod a+x certbot-auto`.

3. Create a *Let's Encrypt* config file =&gt; $  `sudo vi /etc/letsencrypt/configs/example.com.conf`.

4. Press `i` to enter *edit* mode.

5. Paste contents of `configs/letsencrypt.conf` (substitute appropriate values for domain names).

6. Press `Esc` and `:wq` to *save* and *exit*.

7. Run *Cerbot* =&gt; $ `certbot-auto`.

8. Kill any running server on *port 80* =&gt; $ `sudo systemctl stop nginx`.

9. Generate certificates =&gt; $ `./certbot-auto certonly --standalone -d schandillia.com -d www.schandillia.com -d blog.schandillia.com` (substitute appropriate values for domain names).

10. Update *Ubuntu* =&gt; $ `sudo apt update && sudo apt upgrade -y`.
