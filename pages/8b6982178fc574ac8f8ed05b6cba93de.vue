<template>
    <div class="obs" @contextmenu.prevent>
        <Header
            :token="token"
            :tasks="tasks"
            :topic="topic"
            @update="tasksUpdate"
        />
        <div
            class="switcherCon"
            :style="{
                'justify-content': switcher
                    ? switcher > 0
                        ? 'flex-end'
                        : 'flex-start'
                    : 'center'
            }"
        >
            <div
                @mousedown.right="toRight"
                @mousedown.left="toLeft"
                @contextmenu.prevent
                class="switcher"
            >
                <font-awesome-icon icon="arrow-left" v-show="switcher > -1" />
                <font-awesome-icon icon="arrow-right" v-show="switcher < 1" />
            </div>
        </div>
        <div class="framesCon">
            <div
                class="frameRu"
                :style="{ flex: switcher ? (switcher > 0 ? 1 : 0) : 1 }"
            >
                <iframe
                    :src="`https://learn.javascript.ru/${topic.link}`"
                    frameborder="0"
                ></iframe>
            </div>
            <div v-show="!switcher" style="width: 20px"></div>
            <div
                class="frameEn"
                :style="{ flex: switcher ? (switcher > 0 ? 0 : 1) : 1 }"
            >
                <iframe
                    :src="`https://javascript.info/${topic.link}`"
                    frameborder="0"
                ></iframe>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '~/components/Header.vue'
import { store } from '~/store/index'

export default {
    async asyncData() {
        return { token: store.state.token }
    },
    head() {
        return {
            title: store.state.topic?.name || 'Սովորել'
        }
    },
    beforeMount() {
        if (!this.token) {
            this.$router.push('/')
        }
        this.tasksUpdate()
    },
    data() {
        return {
            switcher: 0,
            tasks: []
        }
    },
    components: {
        Header
    },
    computed: {
        topic: store.getters.getTopic
    },
    methods: {
        tasksUpdate() {
            console.log('COOOOOOOOOOOOOOOOOOOOOOm')
            this.tasks = store.state.tasks
        },
        toRight() {
            this.switcher < 1 ? this.switcher++ : (this.switcher = 1)
        },
        toLeft() {
            this.switcher > -1 ? this.switcher-- : (this.switcher = -1)
        }
    }
}
</script>

<style scoped>
.switcherCon {
    position: relative;
    transition: 1s;
    display: flex;
    justify-content: center;
}

.framesCon > div {
    transition: 1s;
}
.switcher {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    border: 1px dotted black;
    top: -15px;
}
.switcher:hover {
    background-color: antiquewhite;
    cursor: pointer;
}
.obs {
    height: 100vh;
    display: flex;
    flex-direction: column;
}
.framesCon {
    display: flex;
    padding: 20px;
    flex: 1;
}
.framesCon > div > iframe {
    width: 100%;
    height: 100%;
}
@media screen and (max-width: 600px) {
    .framesCon {
        padding: 0;
    }
    .framesCon > div:not(:first-child) {
        display: none;
    }
    .framesCon > div:first-child {
        flex: 1 !important;
    }
    .switcherCon {
        display: none;
    }
}
</style>
