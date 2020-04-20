<template>
    <div>
        <div class="con">
            <h1 class="-white">Բարի գալուստ</h1>
            <input
                v-if="!token"
                type="password"
                style="text-align: center"
                placeholder="Գաղտնաբառը"
                v-model="pass"
                @keydown.enter="submit"
            />
            <nuxt-link v-else to="/8b6982178fc574ac8f8ed05b6cba93de"
                >Սովորել</nuxt-link
            >
        </div>
    </div>
</template>

<script>
import { store } from '~/store/index'
import Header from '~/components/Header.vue'

export default {
    async asyncData(ctx) {
        return { token: store.state.token }
    },
    head: {
        title: 'Բարի գալուստ'
    },
    data() {
        return {
            pass: 'pushoks',
            pageLink: ''
        }
    },
    methods: {
        submit() {
            if (this.pass === 'pushoks') {
                const token = '8b6982178fc574ac8f8ed05b6cba93de'
                store.dispatch('setCurrentPageTO', {
                    token,
                    page: this.pageLink
                })
                this.$router.push(`/8b6982178fc574ac8f8ed05b6cba93de`)
            }
        }
    },
    components: {
        Header
    }
}
</script>

<style scoped>
a {
    color: yellow;
    font-size: 60px;
}
h1 {
    font-size: 10vw;
    margin: 50px 0;
}
.con {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
</style>
