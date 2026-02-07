<script lang="ts">

</script>

<div class="topbar surface">
  <div>1</div>
  <div>2</div>
</div>

<style lang="scss">
  .topbar {
    height: 56px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 var(--spacing-6);
  }

  :global(html[data-theme="dark"]) .topbar:global(.surface) {
    background: var(--color-card);
  }
</style>
