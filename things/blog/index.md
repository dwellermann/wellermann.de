---
title: Blog
description: Persönliche Erfahrungen, Gedanken und Experimente rund um Linux, Cloud und Technologie
layout: doc
footer: true
---

<script setup>
import { data } from './posts.data.js'
import PostList from '../../config/.vitepress/theme/components/PostList.vue'
</script>

# Blog
<PostList :posts="data" />

::: tip Chronologische Sortierung
Blog-Posts sind nach Veröffentlichungsdatum sortiert, neueste zuerst. Tags und Kategorien im Frontmatter ermöglichen zukünftige Filterfunktionen.
:::
