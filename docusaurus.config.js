// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const config = {
  title: "React Datepicker",
  tagline: "English and Persian date picker and calendar",
  favicon: "img/logo.svg",
  url: "https://ijavad805.github.io",
  baseUrl: "/react-datepicker/",
  organizationName: "ijavad805",
  projectName: "react-datepicker",
  trailingSlash: false,
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */ (
        {
          docs: {
            sidebarPath: require.resolve("./sidebars.js"),
            editUrl: "https://github.com/ijavad805/react-datepicker/edit/main/",
          },
          blog: false,
          theme: {
            customCss: require.resolve("./docusaurus.theme/custom.css"),
          },
        }
      ),
    ],
  ],
  themeConfig: {
    navbar: {
      title: "React Datepicker",
      logo: {
        alt: "React Datepicker logo",
        src: "img/logo.svg",
      },
      items: [
        {
          type: "doc",
          docId: "intro",
          position: "left",
          label: "Docs",
        },
        {
          href: "https://github.com/ijavad805/react-datepicker",
          label: "GitHub",
          position: "right",
        },
        {
          href: "https://www.npmjs.com/package/@ijavad805/react-datepicker",
          label: "npm",
          position: "right",
        },
      ],
    },
    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [
            {
              label: "Getting Started",
              to: "/docs/intro",
            },
          ],
        },
        {
          title: "Community",
          items: [
            {
              label: "GitHub Issues",
              href: "https://github.com/ijavad805/react-datepicker/issues",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "npm",
              href: "https://www.npmjs.com/package/@ijavad805/react-datepicker",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} React Datepicker.`,
    },
    prism: {
      theme: require("prism-react-renderer/themes/github"),
      darkTheme: require("prism-react-renderer/themes/dracula"),
    },
  },
};

module.exports = config;
