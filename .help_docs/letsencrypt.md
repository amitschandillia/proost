1. Install Certbot =&gt; $ wget https://dl.eff.org/certbot-auto

2. Make it executable =&gt; $ chmod a+x certbot-auto

3. Create a LetsEncrypt config file =&gt; $ sudo vi etc/letsencrypt/configs/example.com.conf

4. Press i to enter edit mode

5. Paste contents of configs/letsencrypt_configs.txt (substitute appropriate values, i.e. DOMAIN NAME)

6. Press Esc and :wq to save and exit

7. Run Cerbot =&gt; $ certbot-auto

8. Kill any running server on port 80 =&gt; $ sudo systemctl stop nginx

9. Generate certificates =&gt; ./certbot-auto certonly --standalone -d &lt;DOMAIN.COM&gt; -d &lt;WWW.DOMAIN.COM&gt; -d &lt;API.DOMAIN.COM&gt; -d &lt;ADMIN.DOMAIN.COM&gt;

10. Update Ubuntu =&gt; $ sudo apt-get update && sudo apt-get upgrade -y
