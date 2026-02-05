---
title: Projekte
description: Eine Übersicht über meine Projekte
layout: doc
footer: true
lastupdated: true
---
<script setup>
import { data } from './projects.data.js'
import PostList from '../../config/.vitepress/theme/components/PostList.vue'
</script>

# Projekte
<PostList :posts="data" />
