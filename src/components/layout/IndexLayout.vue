<template>
    <DefaultLayout :title="title" :header-style="headerStyle">
        <DropdownMenu style="position: relative;top: 90px;z-index: 1000;" slot="menu"
                      :menus="menus" @invoke="menuClick"></DropdownMenu>
        <div slot="left"><slot name="left"></slot></div>
        <div style="height: 100%;width: 100%;" slot="other"><slot name="other"></slot></div>
        <div slot="content" style="height: 100%;width: 100%;">
            <slot name="content"></slot>
        </div>
    </DefaultLayout>
</template>

<script>
    import DropdownMenu from "../menus/DropdownMenu";
    import {getMenu} from "../../request/menus";
    import DefaultLayout from "./DefaultLayout";
    import {title} from "../../libs/Pictures";
    import {layoutConfig} from "../../libs/layoutConfig";

    const headerHeight = layoutConfig.header.height;
    export default {
        name: "IndexLayout",
        components: {DefaultLayout,DropdownMenu},
        props: {
            title: {
                required: true
            }
        },
        data() {
            return {
                headerStyle: {
                    height: `${headerHeight}px`,
                    background: title
                },
                menus: []
            }
        },
        methods: {
            menuClick(m) {
                console.log(m);
                this.$emit("menuChange",m);
            }
        },
        mounted() {
            getMenu().then(menus => {
                menus = menus.map(_ => {_.className = "ulLeft";return _;});
                if (menus.length > 2) {
                    menus[menus.length - 1].className = "ulRight";
                    menus[menus.length - 2].className = "ulRight";
                }
                this.menus.splice(0,0,...menus);
            });
        }
    }
</script>

<style scoped>

</style>