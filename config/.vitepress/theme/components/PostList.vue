<script setup>
import { computed } from 'vue'
import { withBase } from 'vitepress'

const props = defineProps({
  posts: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div class="post-list">
    <div v-for="post in posts" :key="post.url" class="post-item">
      <a :href="withBase(post.url)" class="post-link">
        <article class="post-article">
          <div class="post-header">
            <h2 class="post-title">{{ post.title }}</h2>
            <div class="post-meta" v-if="post.frontmatter.date">
              <span class="post-date">{{ new Date(post.frontmatter.date).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' }) }}</span>
            </div>
          </div>
          <p class="post-excerpt" v-if="post.excerpt">{{ post.excerpt }}</p>
          <div class="post-tags" v-if="post.frontmatter.tags">
            <span v-for="tag in post.frontmatter.tags" :key="tag" class="post-tag">#{{ tag }}</span>
          </div>
        </article>
      </a>
    </div>
  </div>
</template>

<style scoped>
.post-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-top: 2rem;
}

.post-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.post-link:hover .post-title {
  color: var(--vp-c-brand-1);
}

.post-article {
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  padding: 1.5rem;
  background-color: var(--vp-c-bg-soft);
  transition: transform 0.2s, background-color 0.2s;
}

.post-article:hover {
  transform: translateY(-2px);
  background-color: var(--vp-c-bg-alt);
}

.post-title {
  margin: 0;
  border-top: none;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

.post-meta {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: var(--vp-c-text-2);
}

.post-excerpt {
  margin-top: 1rem;
  color: var(--vp-c-text-1);
  line-height: 1.6;
}

.post-tags {
  margin-top: 1rem;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.post-tag {
  font-size: 0.8rem;
  color: var(--vp-c-text-2);
  background-color: var(--vp-c-bg);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  border: 1px solid var(--vp-c-divider);
}
</style>
