// import Settings from "../../../utils/Settings";
// import RenderLib from "../../../../RenderLib"
// import KuudraUtil from "../KuudraUtil"

// // AHH MY EYES
// KuudraUtil.registerWhen(register("renderWorld", () => {
//   // Triangle
//   RenderLib.drawInnerEspBox(-97, 157, -112, 1, 1, 1, 0, 0, 1, true);
//   RenderLib.drawEspBox(-70.5, 79, -134.5, 1, 1, 2, 0, 0, 1, false);
//   RenderLib.drawEspBox(-85.5, 78, -128.5, 1, 1, 2, 0, 0, 1, false); 
//   RenderLib.drawInnerEspBox(-95.5, 161, -105.5, 1, 1, 1, 0, 1, 1, true);
//   RenderLib.drawEspBox(-67.5, 77, -122.5, 1, 1, 2, 0, 1, 1, false);
//   // X
//   RenderLib.drawInnerEspBox(-103, 160, -109, 1, 1, 1, 1, 1, 1, true);
//   RenderLib.drawEspBox(-134.5, 77, -138.5, 1, 1, 1, 1, 1, 1, false);
//   RenderLib.drawEspBox(-130.5, 79, -113.5, 1, 1, 1, 0.588, 0.059, 1, false);
//   RenderLib.drawInnerEspBox(-110, 155, -106, 1, 1, 1, 0.588, 0.059, 1, true);
//   // Square
//   RenderLib.drawInnerEspBox(-43.5, 120, -149.5, 1, 1, 0, 1, 1, 1, true)
//   RenderLib.drawInnerEspBox(-45.5, 135, -138.5, 1, 1, 0, 1, 1, 1, true)
//   RenderLib.drawInnerEspBox(-35.5, 138, -124.5, 1, 1, 0, 1, 1, 1, true)
//   RenderLib.drawInnerEspBox(-26.5, 126, -111.5, 1, 1, 0, 1, 1, 1, true)
//   RenderLib.drawEspBox(-140.5, 78, -90.5, 1, 1, 0, 1, 1, 1, false);
//   // =
//   RenderLib.drawInnerEspBox(-106, 165, -101, 1, 1, 0, 1, 0, 1, true);
//   RenderLib.drawEspBox(-65.5, 76, -87.5, 1, 1, 0, 1, 0, 1, false);
//   // /
//   RenderLib.drawInnerEspBox(-105, 157, -98, 1, 1, 0, 0, 1, 1, true);
//   RenderLib.drawEspBox(-112.5, 76.5, -68.5, 1, 1, 0, 0, 1, 1, false);
// }), () => KuudraUtil.inPhase(1) && Settings().pearl)