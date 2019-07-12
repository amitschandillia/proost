# Nginx Setup
Follow these steps to set up **Nginx** on an **Ubuntu 16+** server:

1. Remove existing *Nginx* installation, if any => $ `sudo apt purge nginx nginx-common`.

2. Remove existing configs, if any => $ `rm -rf /etc/nginx`.

3. Update *Ubuntu* => $ `sudo apt update && sudo apt upgrade -y`.

4. Install *Nginx* => $ `sudo apt install nginx -y`.

5. Check *Nginx* status => $ `sudo systemctl status nginx`.

6. Start *Nginx* => $ `sudo systemctl start nginx`.

7. Enable *Nginx* to automatically run on startup => $ `sudo systemctl enable nginx`.

8. Remove and add default file to *sites-available* => $ `sudo rm /etc/nginx/sites-available/default && sudo vi /etc/nginx/sites-available/default`.

9. Press <kbd>i</kbd> to enter *edit* mode.

10. Paste contents of `configs/nginx.conf` (substitute appropriate values for domain names).

11. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *quit*.

12. Create `snippets` folder => $ `sudo mkdir /etc/nginx/sites-available/snippets`.

13. Create a *mime.types* config snippet => $ `sudo vi /etc/nginx/sites-available/snippets/mime.types`.

14. Press <kbd>i</kbd> to enter *edit* mode.

15. Paste contents of `configs/mime.types`.

16. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *quit*.

17. Create a *proxy.conf* config snippet => $ `sudo vi /etc/nginx/sites-available/snippets/proxy.conf`.

18. Press <kbd>i</kbd> to enter *edit* mode.

19. Paste contents of `configs/proxy.conf`.

20. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *quit*.

21. Create a *ssl-config.conf* config snippet => $ `sudo vi /etc/nginx/sites-available/snippets/ssl-config.conf`.

22. Press <kbd>i</kbd> to enter *edit* mode.

23. Paste contents of `configs/ssl-config.conf`.

24. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *quit*.

25. Create a *static-config.conf* config snippet => $ `sudo vi /etc/nginx/sites-available/snippets/static-config.conf`.

26. Press <kbd>i</kbd> to enter *edit* mode.

27. Paste contents of `configs/static-config.conf`.

28. Press <kbd>Esc</kbd> and <kbd>:</kbd><kbd>w</kbd><kbd>q</kbd> to *save* and *quit*.

29. Reload *Nginx* => $ `sudo /etc/init.d/nginx reload`.
