<script lang="ts">
	/**
	 * 主题切换器组件
	 * Theme Switcher Component
	 */
	import { themeStore } from '../store.svelte';

	interface Props {
		/** 显示模式: 'dropdown' | 'buttons' | 'icon' */
		variant?: 'dropdown' | 'buttons' | 'icon';
		/** 是否显示主题名称 */
		showLabel?: boolean;
		/** 自定义类名 */
		class?: string;
	}

	let { variant = 'dropdown', showLabel = true, class: className = '' }: Props = $props();

	let isOpen = $state(false);

	function handleThemeSelect(themeId: string) {
		themeStore.setTheme(themeId);
		isOpen = false;
	}

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function handleClickOutside(event: MouseEvent) {
		const target = event.target as HTMLElement;
		if (!target.closest('.theme-switcher')) {
			isOpen = false;
		}
	}

	// 图标 SVG
	const sunIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>`;

	const moonIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;

	const systemIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>`;

	const chevronIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`;
</script>

<svelte:window onclick={handleClickOutside} />

{#if variant === 'icon'}
	<!-- 简单图标切换 -->
	<button
		type="button"
		class="theme-switcher theme-icon-btn {className}"
		onclick={() => themeStore.toggleDarkMode()}
		aria-label={themeStore.isDark ? '切换到亮色模式' : '切换到暗色模式'}
	>
		{#if themeStore.isDark}
			{@html sunIcon}
		{:else}
			{@html moonIcon}
		{/if}
	</button>
{:else if variant === 'buttons'}
	<!-- 按钮组模式 -->
	<div class="theme-switcher theme-buttons {className}" role="group" aria-label="主题选择">
		{#each themeStore.availableThemes as theme (theme.id)}
			<button
				type="button"
				class="theme-btn"
				class:active={themeStore.currentThemeId === theme.id}
				onclick={() => handleThemeSelect(theme.id)}
				aria-pressed={themeStore.currentThemeId === theme.id}
			>
				{#if theme.isDark}
					{@html moonIcon}
				{:else}
					{@html sunIcon}
				{/if}
				{#if showLabel}
					<span>{theme.name}</span>
				{/if}
			</button>
		{/each}
	</div>
{:else}
	<!-- 下拉菜单模式 -->
	<div class="theme-switcher theme-dropdown {className}">
		<button
			type="button"
			class="theme-dropdown-trigger"
			onclick={toggleDropdown}
			aria-expanded={isOpen}
			aria-haspopup="listbox"
		>
			{#if themeStore.currentTheme?.isDark}
				{@html moonIcon}
			{:else}
				{@html sunIcon}
			{/if}
			{#if showLabel}
				<span class="theme-label">{themeStore.currentTheme?.name ?? '选择主题'}</span>
			{/if}
			<span class="theme-chevron" class:open={isOpen}>
				{@html chevronIcon}
			</span>
		</button>

		{#if isOpen}
			<ul class="theme-dropdown-menu" role="listbox" aria-label="可用主题">
				{#each themeStore.availableThemes as theme (theme.id)}
					<li role="option" aria-selected={themeStore.currentThemeId === theme.id}>
						<button
							type="button"
							class="theme-dropdown-item"
							class:selected={themeStore.currentThemeId === theme.id}
							onclick={() => handleThemeSelect(theme.id)}
						>
							<span class="theme-color-preview" style="background-color: {theme.colors.primary};"
							></span>
							<span class="theme-info">
								<span class="theme-name">{theme.name}</span>
							</span>
							{#if themeStore.currentThemeId === theme.id}
								<span class="theme-check">✓</span>
							{/if}
						</button>
					</li>
				{/each}

				<li class="theme-dropdown-divider"></li>

				<!-- 模式选择 -->
				<li class="theme-mode-section">
					<span class="theme-mode-label">主题模式</span>
					<div class="theme-mode-buttons">
						<button
							type="button"
							class="theme-mode-btn"
							class:active={themeStore.mode === 'light'}
							onclick={() => themeStore.setMode('light')}
						>
							{@html sunIcon}
						</button>
						<button
							type="button"
							class="theme-mode-btn"
							class:active={themeStore.mode === 'dark'}
							onclick={() => themeStore.setMode('dark')}
						>
							{@html moonIcon}
						</button>
						<button
							type="button"
							class="theme-mode-btn"
							class:active={themeStore.mode === 'system'}
							onclick={() => themeStore.setMode('system')}
						>
							{@html systemIcon}
						</button>
					</div>
				</li>
			</ul>
		{/if}
	</div>
{/if}

<style lang="scss">
	.theme-switcher {
		position: relative;
		font-family: var(--font-family);
	}

	/* 图标按钮样式 */
	.theme-icon-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 40px;
		height: 40px;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
		transition:
			background-color var(--transition-fast) var(--transition-easing),
			border-color var(--transition-fast) var(--transition-easing);
	}

	.theme-icon-btn:hover {
		background-color: var(--color-card);
		border-color: var(--color-primary);
	}

	/* 按钮组样式 */
	.theme-buttons {
		display: flex;
		gap: var(--spacing-2);
		flex-wrap: wrap;
	}

	.theme-btn {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
		transition: all var(--transition-fast) var(--transition-easing);
	}

	.theme-btn:hover {
		border-color: var(--color-primary);
	}

	.theme-btn.active {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}

	/* 下拉菜单样式 */
	.theme-dropdown {
		display: inline-block;
	}

	.theme-dropdown-trigger {
		display: flex;
		align-items: center;
		gap: var(--spacing-2);
		padding: var(--spacing-2) var(--spacing-3);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-text);
		cursor: pointer;
		transition: all var(--transition-fast) var(--transition-easing);
		min-width: 140px;
	}

	.theme-dropdown-trigger:hover {
		border-color: var(--color-primary);
	}

	.theme-label {
		flex: 1;
		text-align: left;
	}

	.theme-chevron {
		display: flex;
		transition: transform var(--transition-fast) var(--transition-easing);
	}

	.theme-chevron.open {
		transform: rotate(180deg);
	}

	.theme-dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		right: 0;
		margin-top: var(--spacing-1);
		padding: var(--spacing-2);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-lg);
		background-color: var(--color-card);
		box-shadow: var(--shadow-lg);
		list-style: none;
		z-index: 1000;
		min-width: 220px;
	}

	.theme-dropdown-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-3);
		width: 100%;
		padding: var(--spacing-2) var(--spacing-3);
		border: none;
		border-radius: var(--radius-md);
		background: transparent;
		color: var(--color-text);
		cursor: pointer;
		text-align: left;
		transition: background-color var(--transition-fast) var(--transition-easing);
	}

	.theme-dropdown-item:hover {
		background-color: var(--color-surface);
	}

	.theme-dropdown-item.selected {
		background-color: var(--color-surface);
	}

	.theme-color-preview {
		width: 16px;
		height: 16px;
		border-radius: var(--radius-full);
		flex-shrink: 0;
	}

	.theme-info {
		flex: 1;
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.theme-name {
		font-size: var(--font-size-sm);
		font-weight: var(--font-weight-medium);
	}

	.theme-description {
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
	}

	.theme-check {
		color: var(--color-primary);
		font-weight: var(--font-weight-bold);
	}

	.theme-dropdown-divider {
		height: 1px;
		margin: var(--spacing-2) 0;
		background-color: var(--color-divider);
	}

	.theme-mode-section {
		padding: var(--spacing-2) var(--spacing-3);
	}

	.theme-mode-label {
		display: block;
		font-size: var(--font-size-xs);
		color: var(--color-text-muted);
		margin-bottom: var(--spacing-2);
	}

	.theme-mode-buttons {
		display: flex;
		gap: var(--spacing-1);
	}

	.theme-mode-btn {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 36px;
		height: 36px;
		padding: 0;
		border: 1px solid var(--color-border);
		border-radius: var(--radius-md);
		background-color: var(--color-surface);
		color: var(--color-text-secondary);
		cursor: pointer;
		transition: all var(--transition-fast) var(--transition-easing);
	}

	.theme-mode-btn:hover {
		border-color: var(--color-primary);
		color: var(--color-text);
	}

	.theme-mode-btn.active {
		background-color: var(--color-primary);
		border-color: var(--color-primary);
		color: white;
	}
</style>
