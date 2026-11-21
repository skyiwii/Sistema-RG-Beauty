const rankingFilter = document.querySelector("[data-ranking-filter]");
const rankingContainer = document.querySelector("[data-ranking-container]");

if (rankingFilter && rankingContainer) {
    const showSelectedRanking = () => {
        const rankingPanels = Array.from(
            rankingContainer.querySelectorAll("[data-dashboard-ranking]")
        );
        if (!rankingPanels.length) {
            return;
        }

        const selectedKey = rankingFilter.value;
        let selectedPanel = rankingPanels.find(
            (panel) => panel.dataset.dashboardRanking === selectedKey
        );

        if (!selectedPanel) {
            rankingFilter.value = rankingPanels[0].dataset.dashboardRanking;
            selectedPanel = rankingPanels[0];
        }

        rankingPanels.forEach((panel) => {
            panel.hidden = panel !== selectedPanel;
        });
    };

    rankingFilter.addEventListener("change", showSelectedRanking);
    new MutationObserver(showSelectedRanking).observe(rankingContainer, {
        childList: true,
    });
    showSelectedRanking();
}
