import { Component, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddDelegationComponent } from './admin/add-delegation/add-delegation.component';
import { AddFamilleComponent } from './admin/add-famille/add-famille.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { DelegationComponent } from './admin/delegation/delegation.component';
import { FamilleComponent } from './admin/famille/famille.component';
import { GouvernoratComponent } from './admin/gouvernorat/gouvernorat.component';
import { ArtComponent } from './article/art/art.component';
import { ArticleComponent } from './article/article/article.component';
import { CommentsComponent } from './article/comments/comments.component';
import { CartCompleteComponent } from './cart/cart-complete/cart-complete.component';
import { ConditionUtilisationComponent } from './condition-utilisation/condition-utilisation.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { LoginGuard } from './guard/login.guard';

import { ActualitesComponent } from './pages/actualites/actualites.component';
import { AddProduitComponent } from './pages/add-produit/add-produit.component';
import { AddArticleComponent } from './pages/article/add-article/add-article.component';
import { ListArticleComponent } from './pages/article/list-article/list-article.component';
import { BlogComponent } from './pages/blog/blog.component';
import { AddCategorieComponent } from './pages/categorie/add-categorie/add-categorie.component';
import { ListeCategorieComponent } from './pages/categorie/liste-categorie/liste-categorie.component';
import { UpdateCategorieComponent } from './pages/categorie/update-categorie/update-categorie.component';
import { ContactComponent } from './pages/contact/contact.component';
import { DiscussionComponent } from './pages/discussion/discussion.component';
import { DiscussionsComponent } from './pages/discussions/discussions.component';
import { HomeComponent } from './pages/home/home.component';
import { InscriptionSocialComponent } from './pages/inscription-social/inscription-social.component';
import { InscriptionComponent } from './pages/inscription/inscription.component';
import { ListContactComponent } from './pages/list-contact/list-contact.component';
import { LoginSocialComponent } from './pages/login-social/login-social.component';
import { LoginComponent } from './pages/login/login.component';
import { AddMarqueComponent } from './pages/marque/add-marque/add-marque.component';
import { ListMarqueComponent } from './pages/marque/list-marque/list-marque.component';
import { UpdateMarqueComponent } from './pages/marque/update-marque/update-marque.component';
import { AddModeleComponent } from './pages/modele/add-modele/add-modele.component';
import { ListModeleComponent } from './pages/modele/list-modele/list-modele.component';
import { FilterComponent } from './pages/nos-produits/filter/filter.component';
import { NosProduitsComponent } from './pages/nos-produits/nos-produits.component';
import { ProduitByIdComponent } from './pages/nos-produits/produit-by-id/produit-by-id.component';
import { ProduitsSearchComponent } from './pages/nos-produits/produits-search/produits-search.component';
import { PieceComponent } from './pages/piece/piece.component';
import { AjouterProduitFrontComponent } from './pages/produits/ajouter-produit-front/ajouter-produit-front.component';
import { ProduitsComponent } from './pages/produits/produits.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { ReglesDeDiffusionComponent } from './pages/regles-de-diffusion/regles-de-diffusion.component';
import { SignupComponent } from './pages/signup/signup.component';
import { UpdateUserComponent } from './pages/update-user/update-user.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { UpdateImageComponent } from './pages/user/update-image/update-image.component';
import { UpdatePasswordComponent } from './pages/user/update-password/update-password.component';
import { UtilisateursComponent } from './pages/utilisateurs/utilisateurs.component';
import { ProduitGuard } from './produit.guard';
import { TestComponent } from './test/test.component';
import { UpdateProduitComponent } from './update-produit/update-produit.component';
import { UserPanelComponent } from './user-panel/user-panel.component';


const routes: Routes = [
  {path:"",component:HomeComponent},
  {path:"produits",component:ProduitsComponent,canActivate:[ProduitGuard]},
  {path:"ajouter",component:AddProduitComponent,canActivate:[ProduitGuard]},
  {path:"ajouter-categorie",component:AddCategorieComponent},
  {path:"inscription",component:AddUserComponent,canActivate:[LoginGuard]},
  {path:"inscription-social",component:InscriptionSocialComponent,canActivate:[LoginGuard]},
  {path:"login",component:LoginComponent,canActivate:[LoginGuard]},
  {path:"profile",component:ProfileComponent,canActivate:[ProduitGuard]},
  {path: 'app-forbidden', component: ForbiddenComponent},
  {path: 'utilisateurs', component: UtilisateursComponent},
  {path: 'pieces', component: PieceComponent},
  {path: 'dashboard', component: DashboardComponent,canActivate:[ProduitGuard]},
  {path: 'categories', component: ListeCategorieComponent,canActivate:[ProduitGuard]},
  {path: 'marques', component: ListMarqueComponent,canActivate:[ProduitGuard]},
  {path: 'ajouter-marque', component: AddMarqueComponent,canActivate:[ProduitGuard]},
  {path:"updateMarque/:id", component:UpdateMarqueComponent,canActivate:[ProduitGuard] },
  {path:"nos-produits", component:NosProduitsComponent },
  {path:"updateCategorie/:id", component:UpdateCategorieComponent ,canActivate:[ProduitGuard]},
  {path:"modeles",component:ListModeleComponent,canActivate:[ProduitGuard]},
  {path:"test",component:TestComponent},
  {path:"modifier-utilisateur/:user_id" ,component:UpdateUserComponent,canActivate:[ProduitGuard]},
  {path:"profile/:user_id",component:ProfileComponent},
  {path:"produit/:id" ,component:ProduitByIdComponent},
  {path:"modifier-image-utilisateur/:user_id" ,component:UpdateImageComponent},
  {path:"update-password",component:UpdatePasswordComponent},
  {path:"contact",component:ContactComponent},
  {path:"contact-liste",component:ListContactComponent,canActivate:[ProduitGuard]},
  {path:"creer-annonce",component:AjouterProduitFrontComponent},
  {path:"actualite",component:ArtComponent},
  {path:"actualites",component:ActualitesComponent},
  {path:"ajouter-modele" , component:AddModeleComponent,canActivate:[ProduitGuard]},
  {path:"articles",component:ListArticleComponent},
  {path:"ajouter-article",component:AddArticleComponent},
  {path:"gouvernorat",component:GouvernoratComponent,canActivate:[ProduitGuard]},
  {path:"delegation",component:DelegationComponent,canActivate:[ProduitGuard]},
  {path:"ajouter-delegation",component:AddDelegationComponent,canActivate:[ProduitGuard]},
  // {path:"filter/:categorie/:libelleMarque/:modele/:gov/:deleg" ,component:FilterComponent},
  {path:"search" ,component:FilterComponent},
  {path:"familles",component:FamilleComponent},
  {path:"Conditions-utilisation",component:ConditionUtilisationComponent},
  {path:"Regles-De-Diffusion",component:ReglesDeDiffusionComponent},
  {path:"nos-produits",component:NosProduitsComponent},
  {path:"cart",component:CartCompleteComponent},
  {path:"updateProduit/:id", component: UpdateProduitComponent,canActivate:[ProduitGuard]},
  {path:"discussion/:emiter/:auteur" ,component:DiscussionComponent},
  {path:"nos-produits-filtree/:famille/:categorie/:marque/:modele/:gouvernorat/:delegation" ,component:ProduitsSearchComponent},
  {path:"discussions" ,component:DiscussionsComponent},
  {path:"sign-up" ,component:SignupComponent,canActivate:[LoginGuard]},
  {path:"mon-compte/:user_id" ,component:UserPanelComponent},
  {path:"verification" ,component:LoginSocialComponent,canActivate:[LoginGuard]},
  {path: "add-familles",component:AddFamilleComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
