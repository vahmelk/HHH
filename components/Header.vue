<template>
    <div>
        <div class="containerMy">
            <div class="header-con">
                <div class="logo">
                    <p>
                        Բարի Գալուստ <code>{{ '😍' }}</code>
                    </p>
                    <button
                        :disabled="!token"
                        :class="[
                            !token
                                ? ''
                                : currentState.isWorking
                                ? 'working'
                                : 'stopped'
                        ]"
                        @click="tick"
                        class="miniContinue -submit"
                    >
                        {{
                            currentState.isWorking
                                ? currentState.text[1]
                                : currentState.text[0]
                        }}
                    </button>
                </div>
                <div class="timerCon">
                    <b-progress
                        class="timer"
                        :value="time"
                        :max="1800"
                        :animated="currentState.isWorking"
                        variant="warning"
                    ></b-progress>
                    <div class="-text">
                        <b>{{ Math.floor(time) }}/1800</b>
                    </div>
                </div>
                <button
                    :disabled="!token"
                    :class="[
                        !token
                            ? ''
                            : currentState.isWorking
                            ? 'working'
                            : 'stopped'
                    ]"
                    @click="tick"
                    class="continue -submit"
                >
                    {{
                        currentState.isWorking
                            ? currentState.text[1]
                            : currentState.text[0]
                    }}
                </button>
            </div>
            <div class="tasks" v-if="token">
                <p>Արված թասկերը</p>
                <div class="-starts" ref="stars" @mousewheel="scrollStars">
                    <b-button
                        v-for="(task, index) in tasks"
                        :style="{
                            'background-color': 'transparent',
                            border: `${+(
                                task.name === topic.name
                            )}px solid yellow`,
                            cursor: `${
                                task.name === topic.name ? 'default' : 'pointer'
                            }`
                        }"
                        :id="'tooltip-button-not-interactive' + index"
                        :key="task.name + index"
                        @click="
                            () => {
                                task.name !== topic.name && changeLinkTo(task)
                            }
                        "
                    >
                        <svg
                            :fill="
                                task.done
                                    ? done[task.part - 1]
                                    : notDone[task.part - 1]
                            "
                        >
                            <polygon
                                points="15.0,1.5 6.0,29.7 28.5,11.7 1.5,11.7 24.0,29.7"
                            />
                        </svg>

                        <b-tooltip
                            placement="left"
                            :target="'tooltip-button-not-interactive' + index"
                            noninteractive
                            ><code class="-white"
                                >{{ index }}){{ task.name }}
                                <br />
                                {{ `${task.done ? 'Ապրես(🥰)' : ''}` }}
                            </code>
                        </b-tooltip>
                    </b-button>
                </div>
            </div>
        </div>
        <div class="taskChecker">
            <div
                id="checker"
                class="-inner"
                :style="{
                    'background-color': topic.done
                        ? done[topic.part - 1]
                        : notDone[topic.part - 1],
                    color: topic.done ? 'black' : 'white'
                }"
                @click="changeTopicDone"
            >
                <font-awesome-icon :icon="topic.done ? 'check' : 'question'" />
            </div>
            <b-tooltip placement="top" target="checker" noninteractive>
                Նշել որպես {{ topic.done ? 'չ' : '' }}արված թասկ(եր)
            </b-tooltip>
        </div>
    </div>
</template>

<script>
import { store } from '~/store/index'

export default {
    props: {
        token: {
            type: String,
            default: ''
        },
        topic: {
            type: Object
        },
        tasks: {
            type: Array,
            default: []
        }
    },
    data() {
        return {
            time: store.state.time,
            currentState: {
                isWorking: false,
                text: ['Շարունակել', 'Դադարեցնել']
            },
            ticker: null,
            done: ['yellow', 'greenyellow', 'lightblue'],
            notDone: ['black', 'darkgrey', 'darkslategray']
        }
    },
    beforeDestroy() {
        this.$axios.$get(
            `https://6ji5c.sse.codesandbox.io/setTime?time=${this.time}`
        )
    },
    methods: {
        scrollStars(event) {
            this.$refs.stars.scrollLeft -= event.deltaY
            event.preventDefault()
        },
        tick() {
            this.currentState.isWorking = !this.currentState.isWorking
            if (this.currentState.isWorking) {
                this.ticker = setInterval(() => {
                    this.time = +(+this.time + 0.1).toFixed(1)
                }, 10000)
            } else {
                clearInterval(this.ticker)
                this.$axios.$get(
                    `https://5orce.sse.codesandbox.io/setTime?time=${this.time}`
                )
            }
        },
        changeLinkTo(link) {
            store.dispatch('setTopic', link)
        },
        changeTopicDone() {
            this.$axios
                .$get(
                    `https://5orce.sse.codesandbox.io/setTopicDone?link=${this.topic.link}`
                )
                .then(() => {
                    store.dispatch('reload').then(() => {
                        this.$emit('update')
                    })
                })
        }
    }
}
</script>

<style scoped>
* {
    user-select: none;
}
.taskChecker {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    justify-content: center;
}
.taskChecker > .-inner {
    width: 50px;
    height: 50px;
    cursor: pointer;
    background-color: white;
    border: 1px dotted purple;
    color: black;
    display: flex;
    justify-content: center;
    border-radius: 50%;
    align-items: center;
}
.containerMy {
    position: sticky;
    top: 0;
    background-color: purple;
    color: white;
    padding: 20px;
    width: 100%;
}
.tasks {
    margin-top: 20px;
}
.tasks > .-starts svg {
    height: 30px;
    min-width: 35px;
    position: relative;
    max-width: 35px;
}
.tasks > .-starts > button:hover svg {
    stroke: purple;
}
.tasks > .-starts {
    max-width: 100%;
    padding: 10px 0;
    overflow: auto visible;
    display: flex;
    justify-content: flex-start;
    flex-wrap: nowrap;
    margin-left: 20px;
}
.header-con,
.tasks {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.timer {
    height: 100%;
}
.timerCon {
    flex: 1;
    position: relative;
}
.timerCon {
    background-color: white;
    margin: 0 20px;
    color: black;
    text-align: center;
    width: 100%;
    height: 23px;
    border-radius: 10px;
    position: relative;
    overflow: hidden;
}
.timerCon .-text {
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    top: 0;
    position: absolute;
}
.miniContinue {
    margin-top: 10px;
    display: none;
}
button {
    border: 1px solid transparent;
    outline: none;
    border-radius: 10px;
    color: white;
    padding: 5px 20px;
}
.stopped {
    cursor: pointer;
    background-color: green;
}
.working {
    cursor: pointer;
    background-color: yellow;
    color: red;
}
button.-submit {
    font-size: 16px;
    font-weight: bold;
}
button.stopped:hover {
    border-color: yellow;
}

button.working:hover {
    border-color: green;
}
button.-submit:active {
    background-color: yellow;
}
.logo {
    display: flex;
    align-items: center;
}

@media screen and (max-width: 600px) {
    .continue {
        display: none;
    }
    .miniContinue {
        display: inline-block;
    }
    .timerCon {
        margin-right: 0;
    }
    .logo {
        display: block;
    }
}
</style>
