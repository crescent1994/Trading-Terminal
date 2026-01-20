<script lang="ts">
	import { ThemeSwitcher, themeStore } from '$lib/theme';
</script>

<div class="demo-container">
	<header class="demo-header">
		<h1>Trading Terminal</h1>
		<p class="subtitle">主题系统演示 / Theme System Demo</p>
		<div class="theme-controls">
			<ThemeSwitcher variant="dropdown" />
		</div>
		<div class="demo-actions">
			<a class="demo-link" href="/terminal">Open app template</a>
		</div>
	</header>

	<main class="demo-content">
		<!-- 主题信息卡片 -->
		<section class="card">
			<h2>当前主题 / Current Theme</h2>
			<div class="theme-info">
				<div class="info-item">
					<span class="label">主题名称:</span>
					<span class="value">{themeStore.currentTheme?.name}</span>
				</div>
				<div class="info-item">
					<span class="label">主题ID:</span>
					<span class="value">{themeStore.currentThemeId}</span>
				</div>
				<div class="info-item">
					<span class="label">模式:</span>
					<span class="value">{themeStore.mode}</span>
				</div>
				<div class="info-item">
					<span class="label">暗色模式:</span>
					<span class="value">{themeStore.isDark ? '是' : '否'}</span>
				</div>
			</div>
		</section>

		<!-- 颜色展示 -->
		<section class="card">
			<h2>颜色系统 / Color System</h2>
			<div class="color-grid">
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-primary);"></div>
					<span>Primary</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-secondary);"></div>
					<span>Secondary</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-accent);"></div>
					<span>Accent</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-success);"></div>
					<span>Success</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-warning);"></div>
					<span>Warning</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-error);"></div>
					<span>Error</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-bullish);"></div>
					<span>Bullish (涨)</span>
				</div>
				<div class="color-item">
					<div class="color-swatch" style="background-color: var(--color-bearish);"></div>
					<span>Bearish (跌)</span>
				</div>
			</div>
		</section>

		<!-- 字体展示 -->
		<section class="card">
			<h2>字体系统 / Typography</h2>
			<div class="typography-demo">
				<h1>标题 H1 - Heading 1</h1>
				<h2>标题 H2 - Heading 2</h2>
				<h3>标题 H3 - Heading 3</h3>
				<p>正文文本 - Body text with <strong>粗体</strong> and <em>斜体</em></p>
				<p class="text-secondary">次要文本 - Secondary text</p>
				<p class="text-muted">弱化文本 - Muted text</p>
				<code>等宽字体 - Monospace: const price = 42000.50;</code>
			</div>
		</section>

		<!-- 组件展示 -->
		<section class="card">
			<h2>组件示例 / Components</h2>
			<div class="components-demo">
				<div class="button-group">
					<button class="btn btn-primary">主要按钮</button>
					<button class="btn btn-secondary">次要按钮</button>
					<button class="btn btn-accent">强调按钮</button>
				</div>
				<div class="input-group">
					<input type="text" placeholder="输入框示例..." />
					<select>
						<option>选择框示例</option>
						<option>选项 1</option>
						<option>选项 2</option>
					</select>
				</div>
			</div>
		</section>

		<!-- 交易数据示例 -->
		<section class="card">
			<h2>交易数据示例 / Trading Data</h2>
			<div class="trading-demo">
				<div class="price-display">
					<span class="symbol">BTC/USDT</span>
					<span class="price text-bullish">$42,150.00</span>
					<span class="change text-bullish">+2.35%</span>
				</div>
				<div class="price-display">
					<span class="symbol">ETH/USDT</span>
					<span class="price text-bearish">$2,280.50</span>
					<span class="change text-bearish">-1.20%</span>
				</div>
			</div>
		</section>

		<!-- 切换器变体展示 -->
		<section class="card">
			<h2>主题切换器变体 / Switcher Variants</h2>
			<div class="switcher-variants">
				<div class="variant-item">
					<span class="variant-label">下拉菜单:</span>
					<ThemeSwitcher variant="dropdown" />
				</div>
				<div class="variant-item">
					<span class="variant-label">图标按钮:</span>
					<ThemeSwitcher variant="icon" />
				</div>
				<div class="variant-item">
					<span class="variant-label">按钮组:</span>
					<ThemeSwitcher variant="buttons" showLabel={false} />
				</div>
			</div>
		</section>
	</main>

	<footer class="demo-footer">
		<p>Trading Terminal Theme System &copy; 2026</p>
	</footer>
</div>

<style>
	.demo-container {
		min-height: 100vh;
		padding: var(--spacing-6);
		max-width: 1200px;
		margin: 0 auto;
	}

	.demo-header {
		text-align: center;
		margin-bottom: var(--spacing-8);
	}

	.demo-header h1 {
		font-size: var(--font-size-4xl);
		margin-bottom: var(--spacing-2);
	}

	.subtitle {
		color: var(--color-text-secondary);
		margin-bottom: var(--spacing-4);
	}

	.theme-controls {
		display: flex;
		justify-content: center;
	}

	.demo-actions {
		margin-top: var(--spacing-3);
		display: flex;
		justify-content: center;
	}

	.demo-link {
		padding: var(--spacing-2) var(--spacing-4);
		border-radius: var(--radius-md);
		border: 1px solid var(--color-border);
		color: var(--color-text);
		text-decoration: none;
		background: var(--color-surface);
		transition: all var(--transition-fast) var(--transition-easing);
	}

	.demo-link:hover {
		border-color: var(--color-primary);
		color: var(--color-primary);
	}

	.demo-content {
		display: grid;
		gap: var(--spacing-6);
	}

	.card {
		background-color: var(--color-card);
		border: 1px solid var(--color-border);
		border-radius: var(--radius-xl);
		padding: var(--spacing-6);
		box-shadow: var(--shadow-md);
	}

	.card h2 {
		font-size: var(--font-size-xl);
		margin-bottom: var(--spacing-4);
		padding-bottom: var(--spacing-2);
		border-bottom: 1px solid var(--color-divider);
	}

	/* 主题信息 */
	.theme-info {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		gap: var(--spacing-3);
	}

	.info-item {
		display: flex;
		gap: var(--spacing-2);
	}

	.info-item .label {
		color: var(--color-text-muted);
	}

	.info-item .value {
		font-weight: var(--font-weight-medium);
	}

	/* 颜色网格 */
	.color-grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
		gap: var(--spacing-4);
	}

	.color-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		gap: var(--spacing-2);
	}

	.color-swatch {
		width: 60px;
		height: 60px;
		border-radius: var(--radius-lg);
		box-shadow: var(--shadow-sm);
	}

	.color-item span {
		font-size: var(--font-size-sm);
		color: var(--color-text-secondary);
	}

	/* 字体展示 */
	.typography-demo {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.typography-demo h1 {
		font-size: var(--font-size-3xl);
	}

	.typography-demo h2 {
		font-size: var(--font-size-2xl);
		border: none;
		padding: 0;
		margin: 0;
	}

	.typography-demo h3 {
		font-size: var(--font-size-xl);
	}

	.text-secondary {
		color: var(--color-text-secondary);
	}

	.text-muted {
		color: var(--color-text-muted);
	}

	/* 组件展示 */
	.components-demo {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.button-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
	}

	.btn {
		padding: var(--spacing-2) var(--spacing-4);
		border-radius: var(--radius-md);
		font-weight: var(--font-weight-medium);
		border: none;
		transition: all var(--transition-fast) var(--transition-easing);
	}

	.btn-primary {
		background-color: var(--color-primary);
		color: white;
	}

	.btn-primary:hover {
		background-color: var(--color-primary-hover);
	}

	.btn-secondary {
		background-color: var(--color-secondary);
		color: white;
	}

	.btn-secondary:hover {
		background-color: var(--color-secondary-hover);
	}

	.btn-accent {
		background-color: var(--color-accent);
		color: white;
	}

	.btn-accent:hover {
		background-color: var(--color-accent-hover);
	}

	.input-group {
		display: flex;
		flex-wrap: wrap;
		gap: var(--spacing-3);
	}

	.input-group input,
	.input-group select {
		padding: var(--spacing-2) var(--spacing-3);
		min-width: 200px;
	}

	/* 交易数据 */
	.trading-demo {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-3);
	}

	.price-display {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
		padding: var(--spacing-3);
		background-color: var(--color-surface);
		border-radius: var(--radius-md);
	}

	.price-display .symbol {
		font-weight: var(--font-weight-semibold);
		min-width: 100px;
	}

	.price-display .price {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-lg);
		font-weight: var(--font-weight-bold);
	}

	.price-display .change {
		font-family: var(--font-family-mono);
		font-size: var(--font-size-sm);
	}

	/* 切换器变体 */
	.switcher-variants {
		display: flex;
		flex-direction: column;
		gap: var(--spacing-4);
	}

	.variant-item {
		display: flex;
		align-items: center;
		gap: var(--spacing-4);
	}

	.variant-label {
		min-width: 100px;
		color: var(--color-text-secondary);
	}

	/* 页脚 */
	.demo-footer {
		text-align: center;
		margin-top: var(--spacing-8);
		padding-top: var(--spacing-4);
		border-top: 1px solid var(--color-divider);
		color: var(--color-text-muted);
	}
</style>
