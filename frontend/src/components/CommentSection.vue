<script setup>
import { ref } from 'vue';

const comment = ref('');
const comments = ref([]);
const submitComment = () => {
  comments.value.push({ id: Date.now(), text: comment.value });
  comment.value = '';
};


<template>
  <div>
    <h3>Comments</h3>
    <input v-model="comment" placeholder="Leave a comment" />
    <button @click="submitComment">Submit</button>
    <div v-for="comment in comments" :key="comment.id">{{ comment.text }}</div>
  </div>
</template>
