# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a Jekyll-based personal blog hosted on GitHub Pages at miha.hribar.org. The site uses a custom theme with LESS stylesheets and serves static content through Jekyll's build system.

## Development Setup

Install dependencies:
```bash
bundle install
```

Serve the site locally:
```bash
bundle exec jekyll serve
```

Build the site:
```bash
bundle exec jekyll build
```

## Architecture

- **Jekyll Configuration**: `_config.yml` configures permalinks, excludes, and syntax highlighting with Rouge
- **Layouts**: `_layouts/` contains the main templates (default.html, post.html, about.html)
- **Posts**: Blog posts in `_posts/` follow Jekyll's naming convention (YYYY-MM-DD-title.md)
- **Styling**: LESS files in `less/` directory are compiled to CSS in `css/` directory
- **Content**: Static pages like about.md and archive.html provide additional content structure

## Key Files

- `_config.yml`: Jekyll configuration with custom permalink structure
- `_layouts/default.html`: Main layout template with OpenGraph and Twitter Card meta tags
- `Gemfile`: Specifies GitHub Pages gem version and html-proofer for testing
- `less/`: LESS stylesheets (common.less, default.less, functions.less, syntax.less)

## Content Structure

- Blog posts are in `_posts/` with markdown files
- Images are organized in `images/` with subdirectories for books, movies, etc.
- Static projects are in `projects/` directory
- Talks and presentations are in `talks/` directory