# Bisheswar — Interactive Portfolio

A complete, editable HTML/CSS/JavaScript portfolio inspired by the supplied reference site: a dark grid canvas, pill navigation, colorful skill cards, an interactive profile card, project tiles, and a floating quick-navigation dock.

## Open on your Windows D: drive

1. Download `bisheswar-portfolio.zip` and right-click it → **Extract All**.
2. Choose `D:\` as the extraction location. The ZIP contains its own `bisheswar-portfolio` folder. Your main file should be `D:\bisheswar-portfolio\index.html`. If that folder already exists, use a different folder name to preserve your existing work.
3. Open VS Code → **File → Open Folder** → select `D:\bisheswar-portfolio`.
4. Double-click `index.html` in File Explorer, or double-click `OPEN-PORTFOLIO.cmd`. The site opens in your default browser.
5. Edit the code in VS Code, save, and refresh the browser to see changes.

`OPEN-IN-VSCODE.cmd` also opens the project if the `code` command is available on your Windows PATH. Otherwise, use File → Open Folder. No administrator permission is needed.

**No npm install, Node.js, API key, backend, or paid service is required.** All images and the résumé are included. The page itself works offline; GitHub, LinkedIn, and email links require the appropriate network/application.

## Files in the download

- `index.html`: all visible text, navigation, project links, and page metadata.
- `style.css`: colours, typography, spacing, responsive layouts, cards, dock, and animations.
- `script.js`: mobile menu, active-section navigation, section reveals, reduced-motion handling, and footer year.
- `assets/images/threshold.webp`: original architectural hero artwork.
- `assets/images/network-hall.webp`: original architectural server-hall artwork.
- `assets/images/profile.jpg`: your existing portfolio portrait.
- `assets/resume/Bisheswar-CV.pdf`: your existing public résumé, copied unchanged.
- `assets/favicon.svg`: portfolio favicon.
- `SOURCES.md`: content and asset provenance.
- `art-prompts.json`: prompts used to create the original background images.
- `.vscode/settings.json`: basic editing settings.
- `OPEN-PORTFOLIO.cmd` / `OPEN-IN-VSCODE.cmd`: local Windows shortcuts.

The authoring checkout uses a `dist/` directory. The download deliberately places its contents at the top level so you can open `index.html` directly.

## Update your details

Search `index.html` for the text or link to update. Contact email is `bisheswarbhattacharjee@gmail.com`. GitHub is `Bisheswar-94`. The LinkedIn link was found in your GitHub profile and your previous portfolio source.

To change the portrait, replace `assets/images/profile.jpg`, keeping the same filename. To update the résumé, replace `assets/resume/Bisheswar-CV.pdf`. To change the background images, replace the corresponding WebP files or update the `src` references and hero preload in `index.html` together.

Colours are defined at the start of `style.css`. Main sections are `home`, `about`, `expertise`, `cyber-lab`, `work`, `certificates`, `education`, `experience`, and `contact`. Project links point to real repositories. The copy describes learning and hands-on projects without claiming professional experience, certifications, security guarantees, or measured performance gains.

The `cyber-lab` section contains CSS-based 3D/animated tool visualization and grouped networking, cybersecurity, defensive monitoring, incident response, cloud, platform, and coding tools. The three placeholder cards in `certificates` are ready to duplicate: replace the title, issuer/date text, and card action with your certificate PDF or verification URL.

The background also includes a visual-only simulated incident-response layer: terminal streams, packet traces, alert telemetry, scanlines, and mitigation status. It does not generate traffic, perform scans, or connect to any security system.

## Behaviour

- The brief opening animation dismisses itself; it never waits on network requests.
- The page uses a responsive grid layout with a profile card, skill cards, project cards, and a bottom quick-navigation dock.
- Text and cards reveal on entry into the viewport.
- Reduced-motion preferences disable opening/reveal/parallax motion and smooth scrolling.
- Navigation works with keyboard and touch. The mobile menu closes on Escape, outside click, or link selection.
- Content and links remain available without JavaScript.
- Contact opens the user's email application. No form submissions or messages are sent by the website itself.
- The résumé link downloads the bundled PDF where supported; some browsers may open it instead.

## Validation and limits

Checked JavaScript syntax, HTML parsing, local file references, internal navigation targets, image decoding, résumé signature, and the ZIP contents. Desktop/mobile breakpoints and reduced-motion rules are included. A live browser layout and interaction test was not performed in the build environment; check the result on your Windows browser and phone before publishing.

This is a local project delivery. Nothing was installed on your Windows computer, and no changes were made to your existing GitHub repositories or deployments. The result recreates the reference's cinematic visual language with portfolio-specific content and original artwork; the recording did not expose the reference site's underlying code or exact animation triggers.

## When you are ready to publish

The files can be served by any static web host. Keep `index.html`, `style.css`, `script.js`, and `assets/` together at the published root. Choose your final hosting address before adding canonical metadata or a sitemap. Publishing, replacing your old website, and search indexing are separate steps and have not been performed.
