docReady( 
	function(){
		const hamburgerBtn = document.querySelector(".nav-bar__hamburger")
			, themeOptions = document.querySelectorAll(".demo-bar__option[name=theme]")
			;

		toggleNav = function() {
			const nav = document.querySelector(".nav-bar__nav");
			toggleClass(nav, "open");
		}
		addAction(hamburgerBtn, "click", toggleNav);

		pickTheme = function() {
			const body = document.querySelector(".theme")
				, themeName = document.querySelector(".demo-bar__option:checked").value
				, theme = "theme-"+themeName
			;
			body.id = theme;
		}
		allAddActions(themeOptions, "change", pickTheme);
	});// end docReady
