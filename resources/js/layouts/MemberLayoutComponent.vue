<template>
	<v-app>
		<v-navigation-drawer v-model="primaryDrawer.model" temporary app overflow :mini-variant.sync='miniDrawer'>
			<v-list-item dense>
				<v-list-item-icon><v-icon>fab fa-dev</v-icon></v-list-item-icon>
				<v-list-item-content>
					<v-list-item-title class="title" v-if='!settings.name'>{{ app.name }}</v-list-item-title>
					<v-list-item-title class="title" v-if='settings.name'>{{ settings.name }}</v-list-item-title>
					<v-list-item-subtitle v-if='!settings.description'>{{ app.desc }}</v-list-item-subtitle>
					<v-list-item-subtitle v-if='settings.description'>{{ settings.description }}</v-list-item-subtitle>
				</v-list-item-content>
			</v-list-item>
			<v-divider></v-divider>
			<v-list dense nav>
				<v-list-item link v-for='(link, index) in linksList' :key='index'  @click='navPage(link)'>
					<v-list-item-icon><v-icon>{{ link.icon }}</v-icon></v-list-item-icon>
					<v-list-item-content><v-list-item-title>{{ link.text }}</v-list-item-title></v-list-item-content>
				</v-list-item>
			</v-list>
		</v-navigation-drawer>
		<v-app-bar :clipped-left="primaryDrawer.clipped" app dense>
			<v-app-bar-nav-icon v-if="primaryDrawer.type !== 'permanent' && $vuetify.breakpoint.xsOnly" @click.stop="primaryDrawer.model = !primaryDrawer.model"></v-app-bar-nav-icon>
			<v-toolbar-title v-if='!settings.name'>{{ app.name }}</v-toolbar-title>
			<v-toolbar-title v-if='settings.name'>{{ settings.name }}</v-toolbar-title>
			<v-spacer></v-spacer>
			<v-toolbar-items v-if="$vuetify.breakpoint.smAndUp">
				<v-btn text @click='navPage({ link: "/" })'><v-icon>mdi-home</v-icon> Home</v-btn>

				<v-menu offset-y>
					<template v-slot:activator="{ on }">
						<v-btn text v-on="on">
							<v-icon>mdi-format-align-justify</v-icon>
						</v-btn>
					</template>
					<v-list>
						<v-list-item v-for="(link, index) in linksList" :key="index" @click='navPage(link)' >
							<v-list-item-title><v-icon>{{ link.icon }}</v-icon> {{ link.text }}</v-list-item-title>
						</v-list-item>
					</v-list>
				</v-menu>
			</v-toolbar-items>
		</v-app-bar>
		<v-content>
			<v-container fluid>
				<alertComponent />

				<div class='container'>
					<div class='row' v-if='!loggedIn'>
						<div class='col-xs-12 col-md-6'>
							<v-card class="mx-auto">
								<v-card-text>
									<h3>Register</h3>
									<registerComponent />
								</v-card-text>
							</v-card>
						</div>
						<div class='col-xs-12 col-md-6'>
							<v-card class="mx-auto">
								<v-card-text v-if='!forgotAccount'>
									<h3>Login</h3>
									<loginComponent />
									<a href='javascript:void(0)' @click='forgotAccount = true'>I forgot my password...</a>
								</v-card-text>
								<v-card-text v-if='forgotAccount'>
									<h3>Forgot Password</h3>
									<forgotPasswordComponent />
									<a href='javascript:void(0)' @click='forgotAccount = false'>I remember my password!</a>

								</v-card-text>
							</v-card>
						</div>
					</div>
					<div v-if='loggedIn'>
						<router-view></router-view>
					</div>
				</div>
			</v-container>
		</v-content>
		<backToTopComponent />
	</v-app>
</template>

<script>
	import registerComponent from '@/components/registerComponent';
	import loginComponent from '@/components/loginComponent';
	import forgotPasswordComponent from '@/components/forgotPasswordComponent';
	import backToTopComponent from '@/components/backToTopComponent';
	import alertComponent from '@/components/alertComponent';

	export default {
		name: 'member-layout-component',
		components: {
			registerComponent,
			loginComponent,
			forgotPasswordComponent,
			backToTopComponent,
			alertComponent
		},
		props: [],
		data() {
			return {
				drawers: ['Default (no property)', 'Permanent', 'Temporary'],
				primaryDrawer: {
					model: null,
					type: 'default (no property)',
					clipped: false,
					floating: false,
					mini: false,
				},
				miniDrawer: true,
				app: {
					name: 'Mathison Projects',
					desc: 'App desc'
				},
				forgotAccount: false
			}
		},
		created() { },
		computed: {
			loggedIn() {
				return this.$store.getters['userStore/loggedIn'];
			},
			notifications() {
				if (this.loggedIn) {
					return {
						general: this.$store.state.notificationsStore.general,
						personal: []
					}
				} else {
					return null;
				}
			},
			settings() {
				return this.$store.state.settingsStore.settings;
			},
			linksList() {
				if (this.loggedIn) {
					return [
						{
							icon: 'mdi-account',
							text: 'Dashboard',
							link: '/member'
						},
						{
							icon: 'mdi-message',
							text: 'Messages',
							link: '/member/message'
						},
						{
							icon: 'mdi-exclamation',
							text: '('+this.notifications.general.length+')',
							link: '/member/notifications'
						},
						{
							icon: 'mdi-bell',
							text: '('+this.notifications.personal.length+')',
							link: '/member/notifications'
						},
						{
							icon: 'mdi-cogs',
							text: 'Settings',
							link: '/member/settings'
						},
						{
							icon: 'mdi-logout',
							text: 'Logout',
							link: null,
							func: 'logout'
						}
					];
				} else {
					return [
						{
							icon: 'mdi-home',
							text: 'Home',
							link: '/'
						},
						{
							icon: 'mdi-pencil',
							text: 'Stylesheet',
							link: '/stylesheet'
						}
					]
				}
			}
		},
		methods: {
			navPage(link) {
				if (link.link != null) {
					this.$router.push(link.link);
				} else if (link.func == 'logout') {
					this.$store.dispatch('userStore/logout');
					this.$router.push('/member');
				}
			}
		}
	};
</script>

<style scoped></style>