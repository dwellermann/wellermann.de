---
title: Docs
description: Technische Dokumentation, Anleitungen und Code-Snippets für Server, Entwicklung und Tools
layout: doc
footer: true
---

<script setup>
import { data } from './docs.data.js'
import PostList from '../../config/.vitepress/theme/components/PostList.vue'
</script>


# Docs
<PostList :posts="data" />

---

::: info Tags & Kategorien
Jede Dokumentation ist mit relevanten Tags versehen. Diese ermöglichen zukünftige Filterfunktionen und bessere Navigation.
:::
