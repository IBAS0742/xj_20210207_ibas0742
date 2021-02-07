<template>
    <nav>
        <ul style="float: right;">
            <li v-for="(m,ind) in menus" :key="ind"><a href="#">{{m.name}}</a>
                <ul :class="m.className">
                    <li v-for="(sm,sind) in m.children" :style="{width:m.width}" :key="sind">
                        <a href="#" @click="invoke(sm)">{{sm.name}}</a></li>
                </ul>
            </li>
        </ul>
    </nav>
</template>

<script>
    export default {
        name: "DropdownMenu",
        props: {
            // [ {
            //      id:'',
            //      name:'',
            //      width: '100px',
            //      className: 'ulRight',
            //      children:[ { // 有且只有一层
            //          id:'',
            //          name:''
            //      } ]
            // } ]
            menus: {
                required: true
            }
        },
        methods: {
            invoke(sm) {
                this.$emit("invoke",sm);
            }
        },
    }
</script>

<style scoped>
    nav {
        width: 100%;
        height: 40px;
        /*background-color: #fff;*/
        background: rgba(0,0,0,0);
    }

    nav p {
        font-family: arial;
        font-size: 24px;
        text-transform: uppercase;
        line-height: 55px;
        padding: 0 20px;
        float: left;
    }

    /*nav ul {*/
    /*    float: left;*/
    /*}*/
    nav ul.ulLeft {
        float: left;
        right: auto;
        left: 0;
    }
    nav ul.ulRight {
        float: right;
        right: 0;
        left: auto;
    }

    nav ul li {
        float: left;
        list-style: none;
        position: relative;
        height: 40px;
        /*background: #106180;*/
        background: rgba(0,0,0,0);
    }

    nav ul li a {
        display: block;
        font-size: 14px;
        padding: 12px 13px;
        text-decoration: none;
        color: white;
        box-sizing: border-box;
        height: 40px;
    }

    nav ul li ul {
        display: none;
        position: absolute;
        background-color: #c4c4c4;
        color: black;
    }

    nav ul li:hover a {
        background: #c4c4c4;
        color: black;
    }
    nav ul li:hover ul {
        display: block;
    }

    /*nav ul li ul li {*/
    /*    width: 160px;*/
    /*}*/

    nav ul li ul li a:hover {
        background-color: #f3f3f3;
    }

</style>