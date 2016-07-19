var findCategory= function(id,array){
	for (var i = 0; i<array.length; ++i){
		if(array[i].id == id){
		return array[i]
		break;	
		};
		
	};
};






(function(){
	var CATEGORIAS="data/categories.json"//creamos una var enlazar el json
	var PARTNERS="data/partners.json"
	var app=angular.module("myApp",["ngRoute"]);

	app.config(["$routeProvider", function($routeProvider){
		$routeProvider.when("/",{//raiz de la url que me quiero inventar
		templateUrl:"templates/home.html",
		controller:"indexController"
		});//necesita para que funcione un controlador

		$routeProvider.when("/muebles/:categoriesId",{//raiz de la url que me quiero inventar
		templateUrl:"templates/gallery.html",
		controller:"newpageController"
		});

		$routeProvider.when("/formulario",{//raiz de la url que me quiero inventar
		templateUrl:"templates/form.html"
		});
	
	}]);//configuramos que funcione la ruta ngRoute
	app.directive("appHeader", function(){
		return{
			restrict:"AE",//no es obligatorio ponerlo
			templateUrl:"components/header.html"
		};
	});
	app.directive("appFooter", function(){
		return{
			templateUrl:"components/footer.html"
		};
	});
	app.directive("appCategory", function(){
		return{
			templateUrl:"components/category.html"
		};
	});
	app.directive("appPartners", function(){
		return{
			templateUrl:"components/partners.html"
		};
	});


	app.controller("indexController", function($http,$scope){
		$http.get(CATEGORIAS).then(function(datos){
		$scope.infoJson = datos.data//data final valida el angular 	
		});
		$http.get(PARTNERS).then(function(logos){
		$scope.infoPartners=logos.data	
		});
	});

	app.controller("newpageController", function($http,$scope,$routeParams){
		$http.get(CATEGORIAS).then(function(id){//id del categories.json
			var Id=$routeParams.categoriesId;
			var category=id.data;//id del categories.json
			$scope.category= findCategory (Id,category)
		});
	});

})();
