# Let's Encrypt Setup

Follow these steps to set up a free **Let's Encrypt** SSL on an **Ubuntu 16+** server:

1. Install *Certbot*.
      ```diff
      $ wget https://dl.eff.org/certbot-auto
      ```

2. Make it executable.
      ```diff
      $ chmod a+x ~/certbot-auto
      ```

3. Create a *Let's Encrypt* config file
      ```diff
      $  sudo vi /etc/letsencrypt/configs/example.com.conf
      ```

4. Press <kbd>i</kbd> to enter *edit* mode.

5. Paste contents of `configs/letsencrypt.conf` (substitute appropriate values for domain names).

6. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *exit*.

7. Run *Cerbot*.
      ```diff
      $ `~/certbot-auto`
      ```

8. Kill any running server on *port 80*.
      ```diff
      $ `sudo systemctl stop nginx`
      ```

9. Generate certificates (substitute appropriate values for domain names).
      ```diff
      $ `~/certbot-auto certonly --standalone -d schandillia.com -d www.schandillia.com -d blog.schandillia.com`
      ```

10. Update *Ubuntu*.
      ```diff
      $ `sudo apt update && sudo apt upgrade -y`
      ```

## Test If Auto-Renewal Is Working

1. Stop *Nginx*.
      ```diff
      $ `sudo systemctl stop nginx`
      ```

2. Run test script.
      ```diff
      $ `sudo ~/certbot-auto renew --dry-run`
      ```

3. Start *Nginx*.
      ```diff
      $ `sudo systemctl start nginx`
      ```

## Manually Renew SSL

1. Stop *Nginx*.
      ```diff
      $ `sudo systemctl stop nginx`
      ```

2. Run renewal script (substitute appropriate values for domain names).
      ```diff
      $ `~/certbot-auto certonly --standalone -d schandillia.com -d www.schandillia.com`
      ```

3. Start *Nginx*.
      ```diff
      $ `sudo systemctl start nginx`
      ```
