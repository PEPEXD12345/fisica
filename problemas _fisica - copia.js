// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas() {
    var sistema = document.getElementById("sistema").value;
    if (sistema === "MKS") {
      document.getElementById("labelEspacio").innerText = "Espacio (d) en metros (m):";
      document.getElementById("labelTiempo").innerText = "Tiempo (t) en segundos (s):";
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en m/s:";
      document.getElementById("espacio").placeholder = "Ej: 100";
      document.getElementById("tiempo").placeholder = "Ej: 10";
      document.getElementById("velocidad").placeholder = "Ej: 10";
    } else if (sistema === "Ingles") {
      document.getElementById("labelEspacio").innerText = "Espacio (d) en pies (ft):";
      document.getElementById("labelTiempo").innerText = "Tiempo (t) en segundos (s):";
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en ft/s:";
      document.getElementById("espacio").placeholder = "Ej: 328.084";
      document.getElementById("tiempo").placeholder = "Ej: 10";
      document.getElementById("velocidad").placeholder = "Ej: 32.8084";
    } else if (sistema === "CGS") {
      document.getElementById("labelEspacio").innerText = "Espacio (d) en centímetros (cm):";
      document.getElementById("labelTiempo").innerText = "Tiempo (t) en segundos (s):";
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en cm/s:";
      document.getElementById("espacio").placeholder = "Ej: 10000";
      document.getElementById("tiempo").placeholder = "Ej: 10";
      document.getElementById("velocidad").placeholder = "Ej: 1000";
    }
  }
  
  // Función principal de cálculo que muestra el procedimiento
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var unitD, unitT, unitV;
    
    // Asignar unidades según el sistema seleccionado
    if (sistema === "MKS") {
      unitD = "m";
      unitT = "s";
      unitV = "m/s";
    } else if (sistema === "Ingles") {
      unitD = "ft";
      unitT = "s";
      unitV = "ft/s";
    } else if (sistema === "CGS") {
      unitD = "cm";
      unitT = "s";
      unitV = "cm/s";
    }
    
    // Obtención de los valores de los campos
    var espacio = document.getElementById("espacio").value;
    var tiempo = document.getElementById("tiempo").value;
    var velocidad = document.getElementById("velocidad").value;
    
    // Contar cuántos campos están vacíos (se debe dejar solo uno vacío)
    var countEmpty = 0;
    if (espacio === "") countEmpty++;
    if (tiempo === "") countEmpty++;
    if (velocidad === "") countEmpty++;
    
    var resultado = document.getElementById("resultado");
    
    if (countEmpty !== 1) {
      resultado.innerHTML = "Por favor, ingresa exactamente dos valores.";
      return;
    }
    
    // Caso: Calcular Espacio (d = v ⋅ t)
    if (espacio === "") {
      var v = parseFloat(velocidad);
      var t = parseFloat(tiempo);
      var d = v * t;
      resultado.innerHTML = "<p><strong>Calculando el Espacio (d):</strong></p>" +
                            "<p>d = v ⋅ t</p>" +
                            "<p>d = " + v + " " + unitV + " ⋅ " + t + " " + unitT + " = " + d.toFixed(2) + " " + unitD + "</p>";
    } 
    // Caso: Calcular Tiempo (t = d / v)
    else if (tiempo === "") {
      var d = parseFloat(espacio);
      var v = parseFloat(velocidad);
      if (v === 0) {
        resultado.innerHTML = "La velocidad no puede ser 0.";
        return;
      }
      var t = d / v;
      resultado.innerHTML = "<p><strong>Calculando el Tiempo (t):</strong></p>" +
                            "<p>t = d / v</p>" +
                            "<p>t = " + d + " " + unitD + " / " + v + " " + unitV + " = " + t.toFixed(2) + " " + unitT + "</p>";
    } 
    // Caso: Calcular Velocidad (v = d / t)
    else if (velocidad === "") {
      var d = parseFloat(espacio);
      var t = parseFloat(tiempo);
      if (t === 0) {
        resultado.innerHTML = "El tiempo no puede ser 0.";
        return;
      }
      var v = d / t;
      resultado.innerHTML = "<p><strong>Calculando la Velocidad (v):</strong></p>" +
                            "<p>v = d / t</p>" +
                            "<p>v = " + d + " " + unitD + " / " + t + " " + unitT + " = " + v.toFixed(2) + " " + unitV + "</p>";
    }
  }
  // Actualiza el formulario según el tipo de movimiento y el sistema de unidades seleccionado
function actualizarFormulario() {
    var sistema = document.getElementById("sistema").value;
    var movimiento = document.getElementById("movimiento").value;
    var formulario = document.getElementById("formulario");
    var unitD, unitV, unitA;
    
    // Definir unidades según el sistema
    if (sistema === "MKS") {
      unitD = "m";
      unitV = "m/s";
      unitA = "m/s²";
    } else if (sistema === "Ingles") {
      unitD = "ft";
      unitV = "ft/s";
      unitA = "ft/s²";
    } else if (sistema === "CGS") {
      unitD = "cm";
      unitV = "cm/s";
      unitA = "cm/s²";
    }
    
    // Generar formulario según el tipo de movimiento
    if (movimiento === "MRU") {
      // MRU: d = v * t (usa tres campos: espacio, tiempo, velocidad)
      formulario.innerHTML = `
        <label id="labelEspacio">Espacio (d) en ${unitD}:</label>
        <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
        
        <label id="labelVelocidad">Velocidad (v) en ${unitV}:</label>
        <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
      `;
    } else if (movimiento === "MRUA") {
      // MRUA: v₍f₎ = v₍i₎ + a*t (usa 4 campos: v inicial, v final, aceleración y tiempo)
      formulario.innerHTML = `
        <label id="labelVi">Velocidad Inicial (v<sub>i</sub>) en ${unitV}:</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa v₍i₎ o déjalo vacío">
        
        <label id="labelVf">Velocidad Final (v<sub>f</sub>) en ${unitV}:</label>
        <input type="number" step="any" id="vf" placeholder="Ingresa v₍f₎ o déjalo vacío">
        
        <label id="labelAceleracion">Aceleración (a) en ${unitA}:</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
      `;
    }
  }
  
  // Función principal para calcular según el tipo de movimiento
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var movimiento = document.getElementById("movimiento").value;
    var resultado = document.getElementById("resultado");
    var unitD, unitV, unitA;
    
    // Asignar unidades según el sistema
    if (sistema === "MKS") {
      unitD = "m";
      unitV = "m/s";
      unitA = "m/s²";
    } else if (sistema === "Ingles") {
      unitD = "ft";
      unitV = "ft/s";
      unitA = "ft/s²";
    } else if (sistema === "CGS") {
      unitD = "cm";
      unitV = "cm/s";
      unitA = "cm/s²";
    }
    
    if (movimiento === "MRU") {
      // Variables para MRU
      var espacio = document.getElementById("espacio").value;
      var tiempo = document.getElementById("tiempo").value;
      var velocidad = document.getElementById("velocidad").value;
      
      // Contar campos vacíos
      var countEmpty = 0;
      if (espacio === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (velocidad === "") countEmpty++;
      
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRU, ingresa exactamente dos valores.";
        return;
      }
      
      // Caso: calcular Espacio (d = v ⋅ t)
      if (espacio === "") {
        var v = parseFloat(velocidad);
        var t = parseFloat(tiempo);
        var d = v * t;
        resultado.innerHTML = "<p><strong>MRU: Cálculo de Espacio (d):</strong></p>" +
                              `<p>d = v ⋅ t</p>` +
                              `<p>d = ${v} ${unitV} ⋅ ${t} s = ${d.toFixed(2)} ${unitD}</p>`;
      } 
      // Caso: calcular Tiempo (t = d / v)
      else if (tiempo === "") {
        var d = parseFloat(espacio);
        var v = parseFloat(velocidad);
        if (v === 0) {
          resultado.innerHTML = "La velocidad no puede ser 0.";
          return;
        }
        var t = d / v;
        resultado.innerHTML = "<p><strong>MRU: Cálculo de Tiempo (t):</strong></p>" +
                              `<p>t = d / v</p>` +
                              `<p>t = ${d} ${unitD} / ${v} ${unitV} = ${t.toFixed(2)} s</p>`;
      } 
      // Caso: calcular Velocidad (v = d / t)
      else if (velocidad === "") {
        var d = parseFloat(espacio);
        var t = parseFloat(tiempo);
        if (t === 0) {
          resultado.innerHTML = "El tiempo no puede ser 0.";
          return;
        }
        var v = d / t;
        resultado.innerHTML = "<p><strong>MRU: Cálculo de Velocidad (v):</strong></p>" +
                              `<p>v = d / t</p>` +
                              `<p>v = ${d} ${unitD} / ${t} s = ${v.toFixed(2)} ${unitV}</p>`;
      }
     } else if (movimiento === "MRUC"){
      function actualizarFormulario() {
        var sistema = document.getElementById("sistema").value;
        var movimiento = document.getElementById("movimiento").value;
        var formulario = document.getElementById("formulario");
        var unitD, unitV, unitA;
        
        // Definir unidades según el sistema
        if (sistema === "MKS") {
          unitD = "m";
          unitV = "m/s";
          unitA = "m/s²";
        } else if (sistema === "Ingles") {
          unitD = "ft";
          unitV = "ft/s";
          unitA = "ft/s²";
        } else if (sistema === "CGS") {
          unitD = "cm";
          unitV = "cm/s";
          unitA = "cm/s²";
        }

     
        
      // variables para MRUC (usamos la ecuación T = 1/F  )
      var periodo  = document.getElementById("perido").value;
      var uno = document.getElementById("uno").value;
      var frecuencia = document.getElementById("frecuencia").value;
       
      // contar campos vacíos
        var countEmpty = 0;
        if ( periodo === "") countEmpty++;
        if ( uno === "" ) countEmpty++;
        if (frecuencia === "") countEmpty++;

        if (countEmpty !== 1) {
          resultado.innerHTML = "para el movimiento circular , ingresar dos valores.";
          return;
        }
        if (periodo == "") {
          var uno = 1 ;
          var f = parseFloat(frecuencia);
          var T =  1 / f ;
          resultado.innerHTML = "<p><strong>MRUC: Calculo de perido  (T):</strong></p>"
         + `<p>T = 1 / f<p>^` +
          `<p>T = ${1} ${unitV} / ${f} = ${T.toFixed(2)} ${unitD}</p>^`
        }
        else if (frecuencia == "") {
          var T = parseFloat(frecuencia);
          var uno = 1;
          if (T === 0 ) {
            resultado.innerHTML =  "El periodo no puede ser  0.";
            return;

          }
          var f = uno / T;
          resultado.innerHTML = "<p><strong>Movimiento circular (f):</strong></p>" +
                                `<p> f = 1 / T <p>` +
                                `<p> f = ${1} / ${T} ${unitV} = ${f.toFixed(2)}</p>`
        }
      }
      function actualizarFormulario() {
        var sistema = document.getElementById("sistema").value;
        var movimiento = document.getElementById("movimiento").value;
        var formulario = document.getElementById("formulario");
        var unitD, unitV, unitA;
        // Definir unidades según el sistema
    if (sistema === "MKS") {
      unitD = "m";
      unitV = "m/s";
      unitA = "m/s²";
    } else if (sistema === "Ingles") {
      unitD = "ft";
      unitV = "ft/s";
      unitA = "ft/s²";
    } else if (sistema === "CGS") {
      unitD = "cm";
      unitV = "cm/s";
      unitA = "cm/s²";
    }   
    if (movimiento === "MRUC") {
      
      `<label id="labelT">Periodo (T) en s: </label>`
      `<input type ="number" step="any" id="tiempo" placeholder=" Ingresa T o dejalo vacío">^`;
      
      `<label id="lablef">Frecuencia (f) en Hz: </label>^`
      `<input type="number" step="any" id="f" placeholder= "ingresa la frecuencia">`

    }
    }

    } else if (movimiento === "MRUA") {
      // Variables para MRUA (usamos la ecuación: v_f = v_i + a * t)
      var vi = document.getElementById("vi").value;
      var vf = document.getElementById("vf").value;
      var aceleracion = document.getElementById("aceleracion").value;
      var tiempo = document.getElementById("tiempo").value;
      
      // Contar campos vacíos
      var countEmpty = 0;
      if (vi === "") countEmpty++;
      if (vf === "") countEmpty++;
      if (aceleracion === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRUA, ingresa exactamente tres valores y deja uno vacío.";
        return;
      }
      
      // Caso: calcular Velocidad Inicial (v_i = v_f − a * t)
      if (vi === "") {
        var vf_val = parseFloat(vf);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vi_calc = vf_val - a * t;
        resultado.innerHTML = "<p><strong>MRUA: Cálculo de Velocidad Inicial (v<sub>i</sub>):</strong></p>" +
                              `<p>v<sub>i</sub> = v<sub>f</sub> − a ⋅ t</p>` +
                              `<p>v<sub>i</sub> = ${vf_val} ${unitV} − ${a} ${unitA} ⋅ ${t} s = ${vi_calc.toFixed(2)} ${unitV}</p>`;
      }
      // Caso: calcular Velocidad Final (v_f = v_i + a * t)
      else if (vf === "") {
        var vi_val = parseFloat(vi);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vf_calc = vi_val + a * t;
        resultado.innerHTML = "<p><strong>MRUA: Cálculo de Velocidad Final (v<sub>f</sub>):</strong></p>" +
                              `<p>v<sub>f</sub> = v<sub>i</sub> + a ⋅ t</p>` +
                              `<p>v<sub>f</sub> = ${vi_val} ${unitV} + ${a} ${unitA} ⋅ ${t} s = ${vf_calc.toFixed(2)} ${unitV}</p>`;
      }
      // Caso: calcular Aceleración (a = (v_f − v_i) / t)
      else if (aceleracion === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (tiempo === "" || parseFloat(tiempo) == 0) {
          resultado.innerHTML = "El tiempo no puede ser 0 para calcular la aceleración.";
          return;
        }
        var t = parseFloat(tiempo);
        var a_calc = (vf_val - vi_val) / t;
        resultado.innerHTML = "<p><strong>MRUA: Cálculo de Aceleración (a):</strong></p>" +
                              `<p>a = (v<sub>f</sub> − v<sub>i</sub>) / t</p>` +
                              `<p>a = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${t} s = ${a_calc.toFixed(2)} ${unitA}</p>`;
      }
      // Caso: calcular Tiempo (t = (v_f − v_i) / a)
      else if (tiempo === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (aceleracion === "" || parseFloat(aceleracion) == 0) {
          resultado.innerHTML = "La aceleración no puede ser 0 para calcular el tiempo.";
          return;
        }
        var a = parseFloat(aceleracion);
        var t_calc = (vf_val - vi_val) / a;
        resultado.innerHTML = "<p><strong>MRUA: Cálculo de Tiempo (t):</strong></p>" +
                              `<p>t = (v<sub>f</sub> − v<sub>i</sub>) / a</p>` +
                              `<p>t = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${a} ${unitA} = ${t_calc.toFixed(2)} s</p>`;
      }
    }
  }
  // Función que actualiza el formulario según la opción seleccionada
function actualizarFormulario() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var formulario = document.getElementById("formulario");
    var html = "";
    
    if (tipo === "MRU") {
      // Cinemática - MRU: d = v ⋅ t
      html = `
        <label id="labelEspacio">Espacio (d):</label>
        <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
        
        <label id="labelVelocidad">Velocidad (v):</label>
        <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
      `;
    } else if (tipo === "MRUA") {
      // Cinemática - MRUA: v₍f₎ = v₍i₎ + a ⋅ t
      html = `
        <label id="labelVi">Velocidad Inicial (v<sub>i</sub>):</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa v₍i₎ o déjalo vacío">
        
        <label id="labelVf">Velocidad Final (v<sub>f</sub>):</label>
        <input type="number" step="any" id="vf" placeholder="Ingresa v₍f₎ o déjalo vacío">
        
        <label id="labelAceleracion">Aceleración (a):</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
      `;

    } else if (tipo === "MRUC") {
      // Cinemática - MRUA: v₍f₎ = v₍i₎ + a ⋅ t
      html = `
        <label id="label1"> 1 :</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa 1">
        
        <label id="labelf">frecuencia:</label>
        <input type="number" step="any" id="f" placeholder="Ingresa frecuencia">
        
      
        <label id="labelT">Periodo (T) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa Perido (T) ">
      `;
    } else if (tipo === "Dinamica") {
      // Dinámica: se añade un submenú para elegir la fórmula dinámica
      html = `
        <p>Selecciona la fórmula dinámica:</p>
        <select id="formulaDinamica" onchange="actualizarFormularioDinamica()">
          <option value="Fuerza">Fuerza (F = m ⋅ a)</option>
          <option value="Peso">Peso (W = m ⋅ g)</option>
          <option value="Rozamiento">Fuerza de Rozamiento (f = μ ⋅ N)</option>
          <option value="Trabajo">Trabajo (W = F ⋅ d ⋅ cos(θ))</option>
        </select>
        <div id="formularioDinamica"></div>
      `;
    }
    
    formulario.innerHTML = html;
    if (tipo === "Dinamica") {
      actualizarFormularioDinamica();
    } else {
      actualizarEtiquetasNoDinamica(); // Actualiza etiquetas para MRU y MRUA según el sistema
    }
  }
  
  // Función que actualiza el formulario interno para las fórmulas de Dinámica
  function actualizarFormularioDinamica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaDinamica").value;
    var container = document.getElementById("formularioDinamica");
    var unitM, unitA, unitF, unitD, g;
    
    // Asignar unidades según el sistema seleccionado
    if (sistema === "MKS") {
      unitM = "kg"; unitA = "m/s²"; unitF = "N"; unitD = "m"; g = 9.8;
    } else if (sistema === "Ingles") {
      unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; unitD = "ft"; g = 32.174;
    } else if (sistema === "CGS") {
      unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; unitD = "cm"; g = 980;
    }
    
    var html = "";
    if (formula === "Fuerza") {
      // Fuerza: F = m * a
      html = `
        <label id="labelFuerza">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Fuerza" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelMasa">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masa" placeholder="Ingresa m o déjalo vacío">
        
        <label id="labelAceleracionD">Aceleración (a) en ${unitA}:</label>
        <input type="number" step="any" id="aceleracionD" placeholder="Ingresa a o déjalo vacío">
      `;
    } else if (formula === "Peso") {
      // Peso: W = m * g
      html = `
        <label id="labelPeso">Peso (W) en ${unitF}:</label>
        <input type="number" step="any" id="peso" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelMasaP">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masaP" placeholder="Ingresa m o déjalo vacío">
        
        <p>g = ${g} ${unitA}</p>
      `;
    } else if (formula === "Rozamiento") {
      // Fuerza de Rozamiento: f = μ * N
      html = `
        <label id="labelRozamiento">Fuerza de Rozamiento (f) en ${unitF}:</label>
        <input type="number" step="any" id="rozamiento" placeholder="Ingresa f o déjalo vacío">
        
        <label id="labelMu">Coeficiente de Rozamiento (μ):</label>
        <input type="number" step="any" id="mu" placeholder="Ingresa μ o déjalo vacío">
        
        <label id="labelNormal">Fuerza Normal (N) en ${unitF}:</label>
        <input type="number" step="any" id="normal" placeholder="Ingresa N o déjalo vacío">
      `;
    } else if (formula === "Trabajo") {
      // Trabajo: W = F * d * cos(θ)
      html = `
        <label id="labelTrabajo">Trabajo (W) en la unidad correspondiente:</label>
        <input type="number" step="any" id="trabajo" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelFTrabajo">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Ftrabajo" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelDistancia">Distancia (d) en ${unitD}:</label>
        <input type="number" step="any" id="distancia" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelAngulo">Ángulo (θ) en grados:</label>
        <input type="number" step="any" id="angulo" placeholder="Ingresa θ o déjalo vacío">
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza etiquetas para MRU y MRUA según el sistema seleccionado
  function actualizarEtiquetasNoDinamica() {
    var sistema = document.getElementById("sistema").value;
    var unitD, unitV;
    if (sistema === "MKS") {
      unitD = "m"; unitV = "m/s";
    } else if (sistema === "Ingles") {
      unitD = "ft"; unitV = "ft/s";
    } else if (sistema === "CGS") {
      unitD = "cm"; unitV = "cm/s";
    }
    if (document.getElementById("labelEspacio"))
      document.getElementById("labelEspacio").innerText = "Espacio (d) en " + unitD + ":";
    if (document.getElementById("labelVelocidad"))
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en " + unitV + ":";
  }
  
  // Función principal de cálculo
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var resultado = document.getElementById("resultado");
    
    if (tipo === "MRU") {
      // MRU: d = v ⋅ t
      var espacio = document.getElementById("espacio").value;
      var tiempo = document.getElementById("tiempo").value;
      var velocidad = document.getElementById("velocidad").value;
      var countEmpty = 0;
      if (espacio === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (velocidad === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRU, ingresa exactamente dos valores.";
        return;
      }
      if (espacio === "") {
        var v = parseFloat(velocidad);
        var t = parseFloat(tiempo);
        var d = v * t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Espacio (d):</strong></p>
                               <p>d = v ⋅ t</p>
                               <p>d = ${v} ⋅ ${t} = ${d.toFixed(2)}</p>`;
      } else if (tiempo === "") {
        var d = parseFloat(espacio);
        var v = parseFloat(velocidad);
        if (v === 0) {
          resultado.innerHTML = "La velocidad no puede ser 0.";
          return;
        }
        var t = d / v;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Tiempo (t):</strong></p>
                               <p>t = d / v</p>
                               <p>t = ${d} / ${v} = ${t.toFixed(2)}</p>`;
      } else if (velocidad === "") {
        var d = parseFloat(espacio);
        var t = parseFloat(tiempo);
        if (t === 0) {
          resultado.innerHTML = "El tiempo no puede ser 0.";
          return;
        }
        var v = d / t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Velocidad (v):</strong></p>
                               <p>v = d / t</p>
                               <p>v = ${d} / ${t} = ${v.toFixed(2)}</p>`;
      }
      
    } else if (tipo === "MRUA") {
      // MRUA: v_f = v_i + a ⋅ t
      var vi = document.getElementById("vi").value;
      var vf = document.getElementById("vf").value;
      var aceleracion = document.getElementById("aceleracion").value;
      var tiempo = document.getElementById("tiempo").value;
      var countEmpty = 0;
      if (vi === "") countEmpty++;
      if (vf === "") countEmpty++;
      if (aceleracion === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRUA, ingresa exactamente tres valores y deja uno vacío.";
        return;
      }
      if (vi === "") {
        var vf_val = parseFloat(vf);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vi_calc = vf_val - a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Inicial (v<sub>i</sub>):</strong></p>
                               <p>v<sub>i</sub> = v<sub>f</sub> − a ⋅ t</p>
                               <p>v<sub>i</sub> = ${vf_val} − ${a} ⋅ ${t} = ${vi_calc.toFixed(2)}</p>`;
      } else if (vf === "") {
        var vi_val = parseFloat(vi);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vf_calc = vi_val + a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Final (v<sub>f</sub>):</strong></p>
                               <p>v<sub>f</sub> = v<sub>i</sub> + a ⋅ t</p>
                               <p>v<sub>f</sub> = ${vi_val} + ${a} ⋅ ${t} = ${vf_calc.toFixed(2)}</p>`;
      } else if (aceleracion === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (tiempo === "" || parseFloat(tiempo) == 0) {
          resultado.innerHTML = "El tiempo no puede ser 0 para calcular la aceleración.";
          return;
        }
        var t = parseFloat(tiempo);
        var a_calc = (vf_val - vi_val) / t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Aceleración (a):</strong></p>
                               <p>a = (v<sub>f</sub> − v<sub>i</sub>) / t</p>
                               <p>a = (${vf_val} − ${vi_val}) / ${t} = ${a_calc.toFixed(2)}</p>`;
      } else if (tiempo === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (aceleracion === "" || parseFloat(aceleracion) == 0) {
          resultado.innerHTML = "La aceleración no puede ser 0 para calcular el tiempo.";
          return;
        }
        var a = parseFloat(aceleracion);
        var t_calc = (vf_val - vi_val) / a;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Tiempo (t):</strong></p>
                               <p>t = (v<sub>f</sub> − v<sub>i</sub>) / a</p>
                               <p>t = (${vf_val} − ${vi_val}) / ${a} = ${t_calc.toFixed(2)}</p>`;
      }
      
    } else if (tipo === "Dinamica") {
      // Dinámica: según la fórmula seleccionada en el submenú
      var formula = document.getElementById("formulaDinamica").value;
      if (formula === "Fuerza") {
        // Fuerza: F = m ⋅ a
        var F = document.getElementById("Fuerza").value;
        var m = document.getElementById("masa").value;
        var a = document.getElementById("aceleracionD").value;
        var countEmpty = 0;
        if (F === "") countEmpty++;
        if (m === "") countEmpty++;
        if (a === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Fuerza, ingresa exactamente dos valores.";
          return;
        }
        if (F === "") {
          var m_val = parseFloat(m);
          var a_val = parseFloat(a);
          var F_calc = m_val * a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F):</strong></p>
                                 <p>F = m ⋅ a</p>
                                 <p>F = ${m_val} ⋅ ${a_val} = ${F_calc.toFixed(2)}</p>`;
        } else if (m === "") {
          var F_val = parseFloat(F);
          var a_val = parseFloat(a);
          if (a_val === 0) {
            resultado.innerHTML = "La aceleración no puede ser 0.";
            return;
          }
          var m_calc = F_val / a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = F / a</p>
                                 <p>m = ${F_val} / ${a_val} = ${m_calc.toFixed(2)}</p>`;
        } else if (a === "") {
          var F_val = parseFloat(F);
          var m_val = parseFloat(m);
          if (m_val === 0) {
            resultado.innerHTML = "La masa no puede ser 0.";
            return;
          }
          var a_calc = F_val / m_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Aceleración (a):</strong></p>
                                 <p>a = F / m</p>
                                 <p>a = ${F_val} / ${m_val} = ${a_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Peso") {
        // Peso: W = m ⋅ g (g depende del sistema)
        var W = document.getElementById("peso").value;
        var m = document.getElementById("masaP").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (m === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Peso, ingresa exactamente un valor desconocido.";
          return;
        }
        var g;
        if (sistema === "MKS") g = 9.8;
        else if (sistema === "Ingles") g = 32.174;
        else if (sistema === "CGS") g = 980;
        if (W === "") {
          var m_val = parseFloat(m);
          var W_calc = m_val * g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Peso (W):</strong></p>
                                 <p>W = m ⋅ g</p>
                                 <p>W = ${m_val} ⋅ ${g} = ${W_calc.toFixed(2)}</p>`;
        } else if (m === "") {
          var W_val = parseFloat(W);
          if (g === 0) {
            resultado.innerHTML = "La gravedad no puede ser 0.";
            return;
          }
          var m_calc = W_val / g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = W / g</p>
                                 <p>m = ${W_val} / ${g} = ${m_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Rozamiento") {
        // Fuerza de Rozamiento: f = μ ⋅ N
        var f = document.getElementById("rozamiento").value;
        var mu = document.getElementById("mu").value;
        var N = document.getElementById("normal").value;
        var countEmpty = 0;
        if (f === "") countEmpty++;
        if (mu === "") countEmpty++;
        if (N === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Fuerza de Rozamiento, ingresa exactamente dos valores.";
          return;
        }
        if (f === "") {
          var mu_val = parseFloat(mu);
          var N_val = parseFloat(N);
          var f_calc = mu_val * N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza de Rozamiento (f):</strong></p>
                                 <p>f = μ ⋅ N</p>
                                 <p>f = ${mu_val} ⋅ ${N_val} = ${f_calc.toFixed(2)}</p>`;
        } else if (mu === "") {
          var f_val = parseFloat(f);
          var N_val = parseFloat(N);
          if (N_val === 0) {
            resultado.innerHTML = "La fuerza normal no puede ser 0.";
            return;
          }
          var mu_calc = f_val / N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Coeficiente de Rozamiento (μ):</strong></p>
                                 <p>μ = f / N</p>
                                 <p>μ = ${f_val} / ${N_val} = ${mu_calc.toFixed(2)}</p>`;
        } else if (N === "") {
          var f_val = parseFloat(f);
          var mu_val = parseFloat(mu);
          if (mu_val === 0) {
            resultado.innerHTML = "El coeficiente de rozamiento no puede ser 0.";
            return;
          }
          var N_calc = f_val / mu_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza Normal (N):</strong></p>
                                 <p>N = f / μ</p>
                                 <p>N = ${f_val} / ${mu_val} = ${N_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Trabajo") {
        // Trabajo: W = F ⋅ d ⋅ cos(θ)
        var W = document.getElementById("trabajo").value;
        var F = document.getElementById("Ftrabajo").value;
        var d = document.getElementById("distancia").value;
        var theta = document.getElementById("angulo").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (F === "") countEmpty++;
        if (d === "") countEmpty++;
        if (theta === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Trabajo, ingresa exactamente tres valores y deja uno vacío.";
          return;
        }
        if (W === "") {
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          var W_calc = F_val * d_val * Math.cos(theta_rad);
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Trabajo (W):</strong></p>
                                 <p>W = F ⋅ d ⋅ cos(θ)</p>
                                 <p>W = ${F_val} ⋅ ${d_val} ⋅ cos(${theta_val}°) = ${W_calc.toFixed(2)}</p>`;
        } else if (F === "") {
          var W_val = parseFloat(W);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (Math.cos(theta_rad) === 0) {
            resultado.innerHTML = "El coseno del ángulo no puede ser 0 para calcular la fuerza.";
            return;
          }
          var F_calc = W_val / (d_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F) en Trabajo:</strong></p>
                                 <p>F = W / (d ⋅ cos(θ))</p>
                                 <p>F = ${W_val} / (${d_val} ⋅ cos(${theta_val}°)) = ${F_calc.toFixed(2)}</p>`;
        } else if (d === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (F_val * Math.cos(theta_rad) === 0) {
            resultado.innerHTML = "El producto F ⋅ cos(θ) no puede ser 0.";
            return;
          }
          var d_calc = W_val / (F_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Distancia (d):</strong></p>
                                 <p>d = W / (F ⋅ cos(θ))</p>
                                 <p>d = ${W_val} / (${F_val} ⋅ cos(${theta_val}°)) = ${d_calc.toFixed(2)}</p>`;
        } else if (theta === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          if (F_val * d_val === 0) {
            resultado.innerHTML = "El producto F ⋅ d no puede ser 0.";
            return;
          }
          var cos_theta = W_val / (F_val * d_val);
          if (cos_theta < -1 || cos_theta > 1) {
            resultado.innerHTML = "No es posible calcular un ángulo válido con los valores proporcionados.";
            return;
          }
          var theta_calc = Math.acos(cos_theta) * 180 / Math.PI;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Ángulo (θ):</strong></p>
                                 <p>θ = arccos(W / (F ⋅ d))</p>
                                 <p>θ = arccos(${W_val} / (${F_val} ⋅ ${d_val})) = ${theta_calc.toFixed(2)}°</p>`;
        }
      }
    }
  }
  // Función que actualiza el formulario según la opción seleccionada
function actualizarFormulario() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var formulario = document.getElementById("formulario");
    var html = "";
    
    if (tipo === "MRU") {
      // Cinemática - MRU: d = v ⋅ t
      html = `
        <label id="labelEspacio">Espacio (d):</label>
        <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
        
        <label id="labelVelocidad">Velocidad (v):</label>
        <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
      `;

      if (tipo === "MRUC") {
        // Cinemática - MRU: d = v ⋅ t
        html = `
          <label id="label1">1:</label>
          <input type="number" step="any" id="one" placeholder="Ingresa el numero 1">
          
          <label id="labelT">Periodo (t) en s:</label>
          <input type="number" step="any" id="T" placeholder="Ingresa T">
          
          <label id="labelf">Frecuencia (f):</label>
          <input type="number" step="any" id="f" placeholder="Ingresa f">
        `; 
    } else if (tipo === "MRUA") {
      // Cinemática - MRUA: v₍f₎ = v₍i₎ + a ⋅ t
      html = `
        <label id="labelVi">Velocidad Inicial (v<sub>i</sub>):</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa v₍i₎ o déjalo vacío">
        
        <label id="labelVf">Velocidad Final (v<sub>f</sub>):</label>
        <input type="number" step="any" id="vf" placeholder="Ingresa v₍f₎ o déjalo vacío">
        
        <label id="labelAceleracion">Aceleración (a):</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
      `;
    }
    } else if (tipo === "Dinamica") {
      // Dinámica: se añade un submenú para elegir la fórmula dinámica
      html = `
        <p>Selecciona la fórmula dinámica:</p>
        <select id="formulaDinamica" onchange="actualizarFormularioDinamica()">
          <option value="Fuerza">Fuerza (F = m ⋅ a)</option>
          <option value="Peso">Peso (W = m ⋅ g)</option>
          <option value="Rozamiento">Fuerza de Rozamiento (f = μ ⋅ N)</option>
          <option value="Trabajo">Trabajo (W = F ⋅ d ⋅ cos(θ))</option>
        </select>
        <div id="formularioDinamica"></div>
      `;
    }
    
    formulario.innerHTML = html;
    if (tipo === "Dinamica") {
      actualizarFormularioDinamica();
    } else {
      actualizarEtiquetasNoDinamica(); // Actualiza etiquetas para MRU y MRUA según el sistema
    }
  }
  
  // Función que actualiza el formulario interno para las fórmulas de Dinámica
  function actualizarFormularioDinamica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaDinamica").value;
    var container = document.getElementById("formularioDinamica");
    var unitM, unitA, unitF, unitD, g;
    
    // Asignar unidades según el sistema seleccionado
    if (sistema === "MKS") {
      unitM = "kg"; unitA = "m/s²"; unitF = "N"; unitD = "m"; g = 9.8;
    } else if (sistema === "Ingles") {
      unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; unitD = "ft"; g = 32.174;
    } else if (sistema === "CGS") {
      unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; unitD = "cm"; g = 980;
    }
    
    var html = "";
    if (formula === "Fuerza") {
      // Fuerza: F = m ⋅ a
      html = `
        <label id="labelFuerza">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Fuerza" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelMasa">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masa" placeholder="Ingresa m o déjalo vacío">
        
        <label id="labelAceleracionD">Aceleración (a) en ${unitA}:</label>
        <input type="number" step="any" id="aceleracionD" placeholder="Ingresa a o déjalo vacío">
      `;
    } else if (formula === "Peso") {
      // Peso: W = m ⋅ g
      html = `
        <label id="labelPeso">Peso (W) en ${unitF}:</label>
        <input type="number" step="any" id="peso" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelMasaP">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masaP" placeholder="Ingresa m o déjalo vacío">
        
        <p>g = ${g} ${unitA}</p>
      `;
    } else if (formula === "Rozamiento") {
      // Fuerza de Rozamiento: f = μ ⋅ N
      html = `
        <label id="labelRozamiento">Fuerza de Rozamiento (f) en ${unitF}:</label>
        <input type="number" step="any" id="rozamiento" placeholder="Ingresa f o déjalo vacío">
        
        <label id="labelMu">Coeficiente de Rozamiento (μ):</label>
        <input type="number" step="any" id="mu" placeholder="Ingresa μ o déjalo vacío">
        
        <label id="labelNormal">Fuerza Normal (N) en ${unitF}:</label>
        <input type="number" step="any" id="normal" placeholder="Ingresa N o déjalo vacío">
      `;
    } else if (formula === "Trabajo") {
      // Trabajo: W = F ⋅ d ⋅ cos(θ)
      html = `
        <label id="labelTrabajo">Trabajo (W) en la unidad correspondiente:</label>
        <input type="number" step="any" id="trabajo" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelFTrabajo">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Ftrabajo" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelDistancia">Distancia (d) en ${unitD}:</label>
        <input type="number" step="any" id="distancia" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelAngulo">Ángulo (θ) en grados:</label>
        <input type="number" step="any" id="angulo" placeholder="Ingresa θ o déjalo vacío">
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza etiquetas para MRU y MRUA según el sistema seleccionado
  function actualizarEtiquetasNoDinamica() {
    var sistema = document.getElementById("sistema").value;
    var unitD, unitV;
    if (sistema === "MKS") {
      unitD = "m"; unitV = "m/s";
    } else if (sistema === "Ingles") {
      unitD = "ft"; unitV = "ft/s";
    } else if (sistema === "CGS") {
      unitD = "cm"; unitV = "cm/s";
    }
    if (document.getElementById("labelEspacio"))
      document.getElementById("labelEspacio").innerText = "Espacio (d) en " + unitD + ":";
    if (document.getElementById("labelVelocidad"))
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en " + unitV + ":";
  }
  
  // Función principal de cálculo
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var resultado = document.getElementById("resultado");
    
    if (tipo === "MRU") {
      // MRU: d = v ⋅ t
      var espacio = document.getElementById("espacio").value;
      var tiempo = document.getElementById("tiempo").value;
      var velocidad = document.getElementById("velocidad").value;
      var countEmpty = 0;
      if (espacio === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (velocidad === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRU, ingresa exactamente dos valores.";
        return;
      }
      // Suponiendo que el tiempo se expresa en segundos siempre, definimos:
      var unitT = "s";
      var unitV, unitD;
      if (sistema === "MKS") { unitV = "m/s"; unitD = "m"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitD = "ft"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitD = "cm"; }
      
      if (espacio === "") {
        var v = parseFloat(velocidad);
        var t = parseFloat(tiempo);
        var d = v * t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Espacio (d):</strong></p>
                               <p>d = v ⋅ t</p>
                               <p>d = ${v} ${unitV} ⋅ ${t} ${unitT} = ${d.toFixed(2)} ${unitD}</p>`;
      } else if (tiempo === "") {
        var d = parseFloat(espacio);
        var v = parseFloat(velocidad);
        if (v === 0) {
          resultado.innerHTML = "La velocidad no puede ser 0.";
          return;
        }
        var t = d / v;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Tiempo (t):</strong></p>
                               <p>t = d / v</p>
                               <p>t = ${d} ${unitD} / ${v} ${unitV} = ${t.toFixed(2)} ${unitT}</p>`;
      } else if (velocidad === "") {
        var d = parseFloat(espacio);
        var t = parseFloat(tiempo);
        if (t === 0) {
          resultado.innerHTML = "El tiempo no puede ser 0.";
          return;
        }
        var v = d / t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Velocidad (v):</strong></p>
                               <p>v = d / t</p>
                               <p>v = ${d} ${unitD} / ${t} ${unitT} = ${v.toFixed(2)} ${unitV}</p>`;
      }
      
    } else if (tipo === "MRUA") {
      // MRUA: v_f = v_i + a ⋅ t
      var vi = document.getElementById("vi").value;
      var vf = document.getElementById("vf").value;
      var aceleracion = document.getElementById("aceleracion").value;
      var tiempo = document.getElementById("tiempo").value;
      var countEmpty = 0;
      if (vi === "") countEmpty++;
      if (vf === "") countEmpty++;
      if (aceleracion === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRUA, ingresa exactamente tres valores y deja uno vacío.";
        return;
      }
      var unitT = "s";
      var unitV;
      var unitA;
      if (sistema === "MKS") { unitV = "m/s"; unitA = "m/s²"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitA = "ft/s²"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitA = "cm/s²"; }
      
      if (vi === "") {
        var vf_val = parseFloat(vf);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vi_calc = vf_val - a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Inicial (v<sub>i</sub>):</strong></p>
                               <p>v<sub>i</sub> = v<sub>f</sub> − a ⋅ t</p>
                               <p>v<sub>i</sub> = ${vf_val} ${unitV} − ${a} ${unitA} ⋅ ${t} ${unitT} = ${vi_calc.toFixed(2)} ${unitV}</p>`;
      } else if (vf === "") {
        var vi_val = parseFloat(vi);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vf_calc = vi_val + a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Final (v<sub>f</sub>):</strong></p>
                               <p>v<sub>f</sub> = v<sub>i</sub> + a ⋅ t</p>
                               <p>v<sub>f</sub> = ${vi_val} ${unitV} + ${a} ${unitA} ⋅ ${t} ${unitT} = ${vf_calc.toFixed(2)} ${unitV}</p>`;
      } else if (aceleracion === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (tiempo === "" || parseFloat(tiempo) == 0) {
          resultado.innerHTML = "El tiempo no puede ser 0 para calcular la aceleración.";
          return;
        }
        var t = parseFloat(tiempo);
        var a_calc = (vf_val - vi_val) / t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Aceleración (a):</strong></p>
                               <p>a = (v<sub>f</sub> − v<sub>i</sub>) / t</p>
                               <p>a = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${t} ${unitT} = ${a_calc.toFixed(2)} ${unitA}</p>`;
      } else if (tiempo === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (aceleracion === "" || parseFloat(aceleracion) == 0) {
          resultado.innerHTML = "La aceleración no puede ser 0 para calcular el tiempo.";
          return;
        }
        var a = parseFloat(aceleracion);
        var t_calc = (vf_val - vi_val) / a;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Tiempo (t):</strong></p>
                               <p>t = (v<sub>f</sub> − v<sub>i</sub>) / a</p>
                               <p>t = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${a} ${unitA} = ${t_calc.toFixed(2)} ${unitT}</p>`;
      }
      
    } else if (tipo === "Dinamica") {
      // Dinámica: según la fórmula seleccionada en el submenú
      var formula = document.getElementById("formulaDinamica").value;
      if (formula === "Fuerza") {
        // Fuerza: F = m ⋅ a
        var F = document.getElementById("Fuerza").value;
        var m = document.getElementById("masa").value;
        var a = document.getElementById("aceleracionD").value;
        var countEmpty = 0;
        if (F === "") countEmpty++;
        if (m === "") countEmpty++;
        if (a === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Fuerza, ingresa exactamente dos valores.";
          return;
        }
        // Se obtienen las unidades para Dinámica según el sistema
        var unitM, unitA, unitF;
        if (sistema === "MKS") { unitM = "kg"; unitA = "m/s²"; unitF = "N"; }
        else if (sistema === "Ingles") { unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; }
        else if (sistema === "CGS") { unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; }
        
        if (F === "") {
          var m_val = parseFloat(m);
          var a_val = parseFloat(a);
          var F_calc = m_val * a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F):</strong></p>
                                 <p>F = m ⋅ a</p>
                                 <p>F = ${m_val} ${unitM} ⋅ ${a_val} ${unitA} = ${F_calc.toFixed(2)} ${unitF}</p>`;
        } else if (m === "") {
          var F_val = parseFloat(F);
          var a_val = parseFloat(a);
          if (a_val === 0) {
            resultado.innerHTML = "La aceleración no puede ser 0.";
            return;
          }
          var m_calc = F_val / a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = F / a</p>
                                 <p>m = ${F_val} ${unitF} / ${a_val} ${unitA} = ${m_calc.toFixed(2)} ${unitM}</p>`;
        } else if (a === "") {
          var F_val = parseFloat(F);
          var m_val = parseFloat(m);
          if (m_val === 0) {
            resultado.innerHTML = "La masa no puede ser 0.";
            return;
          }
          var a_calc = F_val / m_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Aceleración (a):</strong></p>
                                 <p>a = F / m</p>
                                 <p>a = ${F_val} ${unitF} / ${m_val} ${unitM} = ${a_calc.toFixed(2)} ${unitA}</p>`;
        }
      } else if (formula === "Peso") {
        // Peso: W = m ⋅ g
        var W = document.getElementById("peso").value;
        var m = document.getElementById("masaP").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (m === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Peso, ingresa exactamente un valor desconocido.";
          return;
        }
        var g;
        var unitM;
        var unitA, unitF;
        if (sistema === "MKS") { g = 9.8; unitM = "kg"; unitF = "N"; }
        else if (sistema === "Ingles") { g = 32.174; unitM = "lbm"; unitF = "lbf"; }
        else if (sistema === "CGS") { g = 980; unitM = "g"; unitF = "dyn"; }
        if (W === "") {
          var m_val = parseFloat(m);
          var W_calc = m_val * g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Peso (W):</strong></p>
                                 <p>W = m ⋅ g</p>
                                 <p>W = ${m_val} ${unitM} ⋅ ${g} = ${W_calc.toFixed(2)} ${unitF}</p>`;
        } else if (m === "") {
          var W_val = parseFloat(W);
          if (g === 0) {
            resultado.innerHTML = "La gravedad no puede ser 0.";
            return;
          }
          var m_calc = W_val / g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = W / g</p>
                                 <p>m = ${W_val} ${unitF} / ${g} = ${m_calc.toFixed(2)} ${unitM}</p>`;
        }
      } else if (formula === "Rozamiento") {
        // Fuerza de Rozamiento: f = μ ⋅ N
        var f = document.getElementById("rozamiento").value;
        var mu = document.getElementById("mu").value;
        var N = document.getElementById("normal").value;
        var countEmpty = 0;
        if (f === "") countEmpty++;
        if (mu === "") countEmpty++;
        if (N === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Fuerza de Rozamiento, ingresa exactamente dos valores.";
          return;
        }
        if (f === "") {
          var mu_val = parseFloat(mu);
          var N_val = parseFloat(N);
          var f_calc = mu_val * N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza de Rozamiento (f):</strong></p>
                                 <p>f = μ ⋅ N</p>
                                 <p>f = ${mu_val} ⋅ ${N_val} = ${f_calc.toFixed(2)}</p>`;
        } else if (mu === "") {
          var f_val = parseFloat(f);
          var N_val = parseFloat(N);
          if (N_val === 0) {
            resultado.innerHTML = "La fuerza normal no puede ser 0.";
            return;
          }
          var mu_calc = f_val / N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Coeficiente de Rozamiento (μ):</strong></p>
                                 <p>μ = f / N</p>
                                 <p>μ = ${f_val} / ${N_val} = ${mu_calc.toFixed(2)}</p>`;
        } else if (N === "") {
          var f_val = parseFloat(f);
          var mu_val = parseFloat(mu);
          if (mu_val === 0) {
            resultado.innerHTML = "El coeficiente de rozamiento no puede ser 0.";
            return;
          }
          var N_calc = f_val / mu_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza Normal (N):</strong></p>
                                 <p>N = f / μ</p>
                                 <p>N = ${f_val} / ${mu_val} = ${N_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Trabajo") {
        // Trabajo: W = F ⋅ d ⋅ cos(θ)
        var W = document.getElementById("trabajo").value;
        var F = document.getElementById("Ftrabajo").value;
        var d = document.getElementById("distancia").value;
        var theta = document.getElementById("angulo").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (F === "") countEmpty++;
        if (d === "") countEmpty++;
        if (theta === "") countEmpty++;
        if (countEmpty !== 1) {
          resultado.innerHTML = "Para Trabajo, ingresa exactamente tres valores y deja uno vacío.";
          return;
        }
        if (W === "") {
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          var W_calc = F_val * d_val * Math.cos(theta_rad);
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Trabajo (W):</strong></p>
                                 <p>W = F ⋅ d ⋅ cos(θ)</p>
                                 <p>W = ${F_val} ⋅ ${d_val} ⋅ cos(${theta_val}°) = ${W_calc.toFixed(2)}</p>`;
        } else if (F === "") {
          var W_val = parseFloat(W);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (Math.cos(theta_rad) === 0) {
            resultado.innerHTML = "El coseno del ángulo no puede ser 0 para calcular la fuerza.";
            return;
          }
          var F_calc = W_val / (d_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F) en Trabajo:</strong></p>
                                 <p>F = W / (d ⋅ cos(θ))</p>
                                 <p>F = ${W_val} / (${d_val} ⋅ cos(${theta_val}°)) = ${F_calc.toFixed(2)}</p>`;
        } else if (d === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (F_val * Math.cos(theta_rad) === 0) {
            resultado.innerHTML = "El producto F ⋅ cos(θ) no puede ser 0.";
            return;
          }
          var d_calc = W_val / (F_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Distancia (d):</strong></p>
                                 <p>d = W / (F ⋅ cos(θ))</p>
                                 <p>d = ${W_val} / (${F_val} ⋅ cos(${theta_val}°)) = ${d_calc.toFixed(2)}</p>`;
        } else if (theta === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          if (F_val * d_val === 0) {
            resultado.innerHTML = "El producto F ⋅ d no puede ser 0.";
            return;
          }
          var cos_theta = W_val / (F_val * d_val);
          if (cos_theta < -1 || cos_theta > 1) {
            resultado.innerHTML = "No es posible calcular un ángulo válido con los valores proporcionados.";
            return;
          }
          var theta_calc = Math.acos(cos_theta) * 180 / Math.PI;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Ángulo (θ):</strong></p>
                                 <p>θ = arccos(W / (F ⋅ d))</p>
                                 <p>θ = arccos(${W_val} / (${F_val} ⋅ ${d_val})) = ${theta_calc.toFixed(2)}°</p>`;
        }
      }
    }
  }
  // ============================
// Funciones para actualizar formularios
// ============================

// Actualiza el formulario según la opción seleccionada en "tipoCalculo"
function actualizarFormulario() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var formulario = document.getElementById("formulario");
    var html = "";
    
    if (tipo === "MRU") {
      // Cinemática - MRU: d = v ⋅ t
      html = `
        <label id="labelEspacio">Espacio (d):</label>
        <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
        
        <label id="labelVelocidad">Velocidad (v):</label>
        <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
      `;
    } else if (tipo === "MRUA") {
      // Cinemática - MRUA: v_f = v_i + a ⋅ t
      html = `
        <label id="labelVi">Velocidad Inicial (v<sub>i</sub>):</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa v₍i₎ o déjalo vacío">
        
        <label id="labelVf">Velocidad Final (v<sub>f</sub>):</label>
        <input type="number" step="any" id="vf" placeholder="Ingresa v₍f₎ o déjalo vacío">
        
        <label id="labelAceleracion">Aceleración (a):</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
      `;
    } else if (tipo === "Dinamica") {
      // Dinámica: submenú para fórmulas de dinámica
      html = `
        <p>Selecciona la fórmula dinámica:</p>
        <select id="formulaDinamica" onchange="actualizarFormularioDinamica()">
          <option value="Fuerza">Fuerza (F = m ⋅ a)</option>
          <option value="Peso">Peso (W = m ⋅ g)</option>
          <option value="Rozamiento">Fuerza de Rozamiento (f = μ ⋅ N)</option>
          <option value="Trabajo">Trabajo (W = F ⋅ d ⋅ cos(θ))</option>
        </select>
        <div id="formularioDinamica"></div>
      `;
    } else if (tipo === "Hidraulica") {
      // Hidráulica: submenú para fórmulas hidráulicas
      html = `
        <p>Selecciona la fórmula hidráulica:</p>
        <select id="formulaHidraulica" onchange="actualizarFormularioHidraulica()">
          <option value="Presion">Presión (P = F / A)</option>
          <option value="Pascal">Principio de Pascal (F₂ = (F₁/A₁) ⋅ A₂)</option>
          <option value="Arquimedes">Principio de Arquímedes (F_b = ρ ⋅ V ⋅ g)</option>
          <option value="Continuidad">Ecuación de Continuidad (A₁⋅v₁ = A₂⋅v₂)</option>
          <option value="Bernoulli">Ecuación de Bernoulli (P + ½ρv² + ρgh = C)</option>
        </select>
        <div id="formularioHidraulica"></div>
      `;
    }
    
    formulario.innerHTML = html;
    
    if (tipo === "Dinamica") {
      actualizarFormularioDinamica();
    } else if (tipo === "Hidraulica") {
      actualizarFormularioHidraulica();
    } else {
      actualizarEtiquetasNoDinamica(); // Para MRU y MRUA
    }
  }
  
  // Actualiza el formulario interno para las fórmulas de Dinámica (ya implementado previamente)
  function actualizarFormularioDinamica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaDinamica").value;
    var container = document.getElementById("formularioDinamica");
    var unitM, unitA, unitF, unitD, g;
    
    if (sistema === "MKS") {
      unitM = "kg"; unitA = "m/s²"; unitF = "N"; unitD = "m"; g = 9.8;
    } else if (sistema === "Ingles") {
      unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; unitD = "ft"; g = 32.174;
    } else if (sistema === "CGS") {
      unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; unitD = "cm"; g = 980;
    }
    
    var html = "";
    if (formula === "Fuerza") {
      html = `
        <label id="labelFuerza">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Fuerza" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelMasa">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masa" placeholder="Ingresa m o déjalo vacío">
        
        <label id="labelAceleracionD">Aceleración (a) en ${unitA}:</label>
        <input type="number" step="any" id="aceleracionD" placeholder="Ingresa a o déjalo vacío">
      `;
    } else if (formula === "Peso") {
      html = `
        <label id="labelPeso">Peso (W) en ${unitF}:</label>
        <input type="number" step="any" id="peso" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelMasaP">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masaP" placeholder="Ingresa m o déjalo vacío">
        
        <p>g = ${g} ${unitA}</p>
      `;
    } else if (formula === "Rozamiento") {
      html = `
        <label id="labelRozamiento">Fuerza de Rozamiento (f) en ${unitF}:</label>
        <input type="number" step="any" id="rozamiento" placeholder="Ingresa f o déjalo vacío">
        
        <label id="labelMu">Coeficiente de Rozamiento (μ):</label>
        <input type="number" step="any" id="mu" placeholder="Ingresa μ o déjalo vacío">
        
        <label id="labelNormal">Fuerza Normal (N) en ${unitF}:</label>
        <input type="number" step="any" id="normal" placeholder="Ingresa N o déjalo vacío">
      `;
    } else if (formula === "Trabajo") {
      html = `
        <label id="labelTrabajo">Trabajo (W) en la unidad correspondiente:</label>
        <input type="number" step="any" id="trabajo" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelFTrabajo">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Ftrabajo" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelDistancia">Distancia (d) en ${unitD}:</label>
        <input type="number" step="any" id="distancia" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelAngulo">Ángulo (θ) en grados:</label>
        <input type="number" step="any" id="angulo" placeholder="Ingresa θ o déjalo vacío">
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza el formulario interno para las fórmulas Hidráulicas
  function actualizarFormularioHidraulica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaHidraulica").value;
    var container = document.getElementById("formularioHidraulica");
    var html = "";
    var unitP, unitF, unitA; // Para presión y prensa
    var unitM, unitDensity, unitV, unitArea; // Para Arquímedes y Continuidad
    var g;
    
    // Asignación de unidades según el sistema para la parte hidráulica
    if (sistema === "MKS") {
      unitP = "Pa"; unitF = "N"; unitA = "m²";
      unitM = "kg"; unitDensity = "kg/m³"; unitV = "m³"; unitArea = "m²";
      g = 9.8;
    } else if (sistema === "Ingles") {
      unitP = "lbf/ft²"; unitF = "lbf"; unitA = "ft²";
      unitM = "lbm"; unitDensity = "lbm/ft³"; unitV = "ft³"; unitArea = "ft²";
      g = 32.174;
    } else if (sistema === "CGS") {
      unitP = "dyn/cm²"; unitF = "dyn"; unitA = "cm²";
      unitM = "g"; unitDensity = "g/cm³"; unitV = "cm³"; unitArea = "cm²";
      g = 980;
    }
    
    if (formula === "Presion") {
      // Presión: P = F / A
      html = `
        <label id="labelPresion">Presión (P) en ${unitP}:</label>
        <input type="number" step="any" id="presion" placeholder="Ingresa P o déjalo vacío">
        
        <label id="labelFuerzaH">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="fuerzaH" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelArea">Área (A) en ${unitA}:</label>
        <input type="number" step="any" id="area" placeholder="Ingresa A o déjalo vacío">
      `;
    } else if (formula === "Pascal") {
      // Principio de Pascal: F₂ = (F₁/A₁)*A₂
      html = `
        <label id="labelF1">Fuerza Inicial (F₁) en ${unitF}:</label>
        <input type="number" step="any" id="F1" placeholder="Ingresa F₁ o déjalo vacío">
        
        <label id="labelA1">Área Inicial (A₁) en ${unitA}:</label>
        <input type="number" step="any" id="A1" placeholder="Ingresa A₁ o déjalo vacío">
        
        <label id="labelA2">Área Final (A₂) en ${unitA}:</label>
        <input type="number" step="any" id="A2" placeholder="Ingresa A₂ o déjalo vacío">
        
        <label id="labelF2">Fuerza Final (F₂) en ${unitF}:</label>
        <input type="number" step="any" id="F2" placeholder="Ingresa F₂ o déjalo vacío">
      `;
    } else if (formula === "Arquimedes") {
      // Principio de Arquímedes: F_b = ρ * V * g
      html = `
        <label id="labelFb">Fuerza de Arquímedes (F<sub>b</sub>) en ${unitF}:</label>
        <input type="number" step="any" id="Fb" placeholder="Ingresa F₍b₎ o déjalo vacío">
        
        <label id="labelDensidad">Densidad (ρ) en ${unitDensity}:</label>
        <input type="number" step="any" id="densidad" placeholder="Ingresa ρ o déjalo vacío">
        
        <label id="labelVolumen">Volumen (V) en ${unitV}:</label>
        <input type="number" step="any" id="volumen" placeholder="Ingresa V o déjalo vacío">
        
        <p>g = ${g} ${sistema === "CGS" ? "cm/s²" : (sistema === "Ingles" ? "ft/s²" : "m/s²")}</p>
      `;
    } else if (formula === "Continuidad") {
      // Ecuación de Continuidad: A₁ * v₁ = A₂ * v₂
      html = `
        <label id="labelA1Cont">Área 1 (A₁) en ${unitA}:</label>
        <input type="number" step="any" id="A1Cont" placeholder="Ingresa A₁ o déjalo vacío">
        
        <label id="labelV1">Velocidad 1 (v₁) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="v1" placeholder="Ingresa v₁ o déjalo vacío">
        
        <label id="labelA2Cont">Área 2 (A₂) en ${unitA}:</label>
        <input type="number" step="any" id="A2Cont" placeholder="Ingresa A₂ o déjalo vacío">
        
        <label id="labelV2">Velocidad 2 (v₂) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="v2" placeholder="Ingresa v₂ o déjalo vacío">
      `;
    } else if (formula === "Bernoulli") {
      // Ecuación de Bernoulli: P + ½ρv² + ρgh = C
      html = `
        <label id="labelConstante">Constante (C) en ${unitP}:</label>
        <input type="number" step="any" id="constante" placeholder="Ingresa C o déjalo vacío">
        
        <label id="labelPresionB">Presión (P) en ${unitP}:</label>
        <input type="number" step="any" id="presionB" placeholder="Ingresa P o déjalo vacío">
        
        <label id="labelVelocidadB">Velocidad (v) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="velocidadB" placeholder="Ingresa v o déjalo vacío">
        
        <label id="labelAltura">Altura (h) en ${sistema === "MKS" ? "m" : (sistema === "Ingles" ? "ft" : "cm")}:</label>
        <input type="number" step="any" id="altura" placeholder="Ingresa h o déjalo vacío">
        
        <label id="labelDensidadB">Densidad (ρ) en ${unitDensity}:</label>
        <input type="number" step="any" id="densidadB" placeholder="Ingresa ρ (deja vacío para usar valor por defecto)">
        <p>g = ${g} ${sistema === "CGS" ? "cm/s²" : (sistema === "Ingles" ? "ft/s²" : "m/s²")}</p>
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza etiquetas para MRU y MRUA según el sistema (sin cambios)
  function actualizarEtiquetasNoDinamica() {
    var sistema = document.getElementById("sistema").value;
    var unitD, unitV;
    if (sistema === "MKS") {
      unitD = "m"; unitV = "m/s";
    } else if (sistema === "Ingles") {
      unitD = "ft"; unitV = "ft/s";
    } else if (sistema === "CGS") {
      unitD = "cm"; unitV = "cm/s";
    }
    if (document.getElementById("labelEspacio"))
      document.getElementById("labelEspacio").innerText = "Espacio (d) en " + unitD + ":";
    if (document.getElementById("labelVelocidad"))
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en " + unitV + ":";
  }
  
  // ============================
  // Función principal de cálculo
  // ============================
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var resultado = document.getElementById("resultado");
    
    // ----------------------------
    // Cinemática - MRU
    // ----------------------------
    if (tipo === "MRU") {
      var espacio = document.getElementById("espacio").value;
      var tiempo = document.getElementById("tiempo").value;
      var velocidad = document.getElementById("velocidad").value;
      var countEmpty = 0;
      if (espacio === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (velocidad === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRU, ingresa exactamente dos valores.";
        return;
      }
      var unitT = "s", unitV, unitD;
      if (sistema === "MKS") { unitV = "m/s"; unitD = "m"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitD = "ft"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitD = "cm"; }
      
      if (espacio === "") {
        var v = parseFloat(velocidad);
        var t = parseFloat(tiempo);
        var d = v * t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Espacio (d):</strong></p>
                               <p>d = v ⋅ t</p>
                               <p>d = ${v} ${unitV} ⋅ ${t} ${unitT} = ${d.toFixed(2)} ${unitD}</p>`;
      } else if (tiempo === "") {
        var d = parseFloat(espacio);
        var v = parseFloat(velocidad);
        if (v === 0) { resultado.innerHTML = "La velocidad no puede ser 0."; return; }
        var t = d / v;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Tiempo (t):</strong></p>
                               <p>t = d / v</p>
                               <p>t = ${d} ${unitD} / ${v} ${unitV} = ${t.toFixed(2)} ${unitT}</p>`;
      } else if (velocidad === "") {
        var d = parseFloat(espacio);
        var t = parseFloat(tiempo);
        if (t === 0) { resultado.innerHTML = "El tiempo no puede ser 0."; return; }
        var v = d / t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Velocidad (v):</strong></p>
                               <p>v = d / t</p>
                               <p>v = ${d} ${unitD} / ${t} ${unitT} = ${v.toFixed(2)} ${unitV}</p>`;
      }
    
    // ----------------------------
    // Cinemática - MRUA
    // ----------------------------
    } else if (tipo === "MRUA") {
      var vi = document.getElementById("vi").value;
      var vf = document.getElementById("vf").value;
      var aceleracion = document.getElementById("aceleracion").value;
      var tiempo = document.getElementById("tiempo").value;
      var countEmpty = 0;
      if (vi === "") countEmpty++;
      if (vf === "") countEmpty++;
      if (aceleracion === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (countEmpty !== 1) {
        resultado.innerHTML = "Para MRUA, ingresa exactamente tres valores y deja uno vacío.";
        return;
      }
      var unitT = "s", unitV, unitA;
      if (sistema === "MKS") { unitV = "m/s"; unitA = "m/s²"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitA = "ft/s²"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitA = "cm/s²"; }
      
      if (vi === "") {
        var vf_val = parseFloat(vf);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vi_calc = vf_val - a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Inicial (v<sub>i</sub>):</strong></p>
                               <p>v<sub>i</sub> = v<sub>f</sub> − a ⋅ t</p>
                               <p>v<sub>i</sub> = ${vf_val} ${unitV} − ${a} ${unitA} ⋅ ${t} ${unitT} = ${vi_calc.toFixed(2)} ${unitV}</p>`;
      } else if (vf === "") {
        var vi_val = parseFloat(vi);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vf_calc = vi_val + a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Final (v<sub>f</sub>):</strong></p>
                               <p>v<sub>f</sub> = v<sub>i</sub> + a ⋅ t</p>
                               <p>v<sub>f</sub> = ${vi_val} ${unitV} + ${a} ${unitA} ⋅ ${t} ${unitT} = ${vf_calc.toFixed(2)} ${unitV}</p>`;
      } else if (aceleracion === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (tiempo === "" || parseFloat(tiempo) == 0) { resultado.innerHTML = "El tiempo no puede ser 0 para calcular la aceleración."; return; }
        var t = parseFloat(tiempo);
        var a_calc = (vf_val - vi_val) / t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Aceleración (a):</strong></p>
                               <p>a = (v<sub>f</sub> − v<sub>i</sub>) / t</p>
                               <p>a = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${t} ${unitT} = ${a_calc.toFixed(2)} ${unitA}</p>`;
      } else if (tiempo === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (aceleracion === "" || parseFloat(aceleracion) == 0) { resultado.innerHTML = "La aceleración no puede ser 0 para calcular el tiempo."; return; }
        var a = parseFloat(aceleracion);
        var t_calc = (vf_val - vi_val) / a;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Tiempo (t):</strong></p>
                               <p>t = (v<sub>f</sub> − v<sub>i</sub>) / a</p>
                               <p>t = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${a} ${unitA} = ${t_calc.toFixed(2)} ${unitT}</p>`;
      }
    
    // ----------------------------
    // Dinámica (ya implementada previamente)
    // ----------------------------
    } else if (tipo === "Dinamica") {
      var formula = document.getElementById("formulaDinamica").value;
      // Se procesan las fórmulas de dinámica (Fuerza, Peso, Rozamiento, Trabajo)
      // [El código correspondiente ya se muestra en la versión anterior]
      // (Aquí se mantiene el mismo bloque para Dinámica)
      // ...
      // (Se asume que el código para Dinámica está presente sin modificaciones en este ejemplo)
    
    // ----------------------------
    // Hidráulica
    // ----------------------------
    } else if (tipo === "Hidraulica") {
      var formula = document.getElementById("formulaHidraulica").value;
      
      // Presión: P = F / A
      if (formula === "Presion") {
        var P = document.getElementById("presion").value;
        var F = document.getElementById("fuerzaH").value;
        var A = document.getElementById("area").value;
        var countEmpty = 0;
        if (P === "") countEmpty++;
        if (F === "") countEmpty++;
        if (A === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Presión, ingresa exactamente dos valores."; return; }
        if (P === "") {
          var F_val = parseFloat(F);
          var A_val = parseFloat(A);
          var P_calc = F_val / A_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Presión (P):</strong></p>
                                 <p>P = F / A</p>
                                 <p>P = ${F_val} ${unitF} / ${A_val} ${unitA} = ${P_calc.toFixed(2)} ${unitP}</p>`;
        } else if (F === "") {
          var P_val = parseFloat(P);
          var A_val = parseFloat(A);
          var F_calc = P_val * A_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza (F):</strong></p>
                                 <p>F = P ⋅ A</p>
                                 <p>F = ${P_val} ${unitP} ⋅ ${A_val} ${unitA} = ${F_calc.toFixed(2)} ${unitF}</p>`;
        } else if (A === "") {
          var P_val = parseFloat(P);
          var F_val = parseFloat(F);
          var A_calc = F_val / P_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área (A):</strong></p>
                                 <p>A = F / P</p>
                                 <p>A = ${F_val} ${unitF} / ${P_val} ${unitP} = ${A_calc.toFixed(2)} ${unitA}</p>`;
        }
        
      // Principio de Pascal: F₂ = (F₁/A₁) ⋅ A₂
      } else if (formula === "Pascal") {
        var F1 = document.getElementById("F1").value;
        var A1 = document.getElementById("A1").value;
        var A2 = document.getElementById("A2").value;
        var F2 = document.getElementById("F2").value;
        var countEmpty = 0;
        if (F1 === "") countEmpty++;
        if (A1 === "") countEmpty++;
        if (A2 === "") countEmpty++;
        if (F2 === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Pascal, ingresa exactamente tres valores y deja uno vacío."; return; }
        if (F2 === "") {
          var F1_val = parseFloat(F1);
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var F2_calc = (F1_val / A1_val) * A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza Final (F₂):</strong></p>
                                 <p>F₂ = (F₁ / A₁) ⋅ A₂</p>
                                 <p>F₂ = (${F1_val} ${unitF} / ${A1_val} ${unitA}) ⋅ ${A2_val} ${unitA} = ${F2_calc.toFixed(2)} ${unitF}</p>`;
        } else if (F1 === "") {
          var F2_val = parseFloat(F2);
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var F1_calc = (F2_val * A1_val) / A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza Inicial (F₁):</strong></p>
                                 <p>F₁ = (F₂ ⋅ A₁) / A₂</p>
                                 <p>F₁ = (${F2_val} ${unitF} ⋅ ${A1_val} ${unitA}) / ${A2_val} ${unitA} = ${F1_calc.toFixed(2)} ${unitF}</p>`;
        } else if (A1 === "") {
          var F1_val = parseFloat(F1);
          var F2_val = parseFloat(F2);
          var A2_val = parseFloat(A2);
          var A1_calc = (F1_val * A2_val) / F2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área Inicial (A₁):</strong></p>
                                 <p>A₁ = (F₁ ⋅ A₂) / F₂</p>
                                 <p>A₁ = (${F1_val} ${unitF} ⋅ ${A2_val} ${unitA}) / ${F2_val} ${unitF} = ${A1_calc.toFixed(2)} ${unitA}</p>`;
        } else if (A2 === "") {
          var F1_val = parseFloat(F1);
          var A1_val = parseFloat(A1);
          var F2_val = parseFloat(F2);
          var A2_calc = (F2_val * A1_val) / F1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área Final (A₂):</strong></p>
                                 <p>A₂ = (F₂ ⋅ A₁) / F₁</p>
                                 <p>A₂ = (${F2_val} ${unitF} ⋅ ${A1_val} ${unitA}) / ${F1_val} ${unitF} = ${A2_calc.toFixed(2)} ${unitA}</p>`;
        }
        
      // Principio de Arquímedes: F_b = ρ ⋅ V ⋅ g
      } else if (formula === "Arquimedes") {
        var Fb = document.getElementById("Fb").value;
        var densidad = document.getElementById("densidad").value;
        var V = document.getElementById("volumen").value;
        var countEmpty = 0;
        if (Fb === "") countEmpty++;
        if (densidad === "") countEmpty++;
        if (V === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Arquímedes, ingresa exactamente dos valores."; return; }
        if (Fb === "") {
          var dens_val = parseFloat(densidad);
          var V_val = parseFloat(V);
          var Fb_calc = dens_val * V_val * g;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza de Arquímedes (F₍b₎):</strong></p>
                                 <p>F₍b₎ = ρ ⋅ V ⋅ g</p>
                                 <p>F₍b₎ = ${dens_val} ${unitDensity} ⋅ ${V_val} ${unitV} ⋅ ${g} = ${Fb_calc.toFixed(2)} ${unitF}</p>`;
        } else if (densidad === "") {
          var Fb_val = parseFloat(Fb);
          var V_val = parseFloat(V);
          var dens_calc = Fb_val / (V_val * g);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Densidad (ρ):</strong></p>
                                 <p>ρ = F₍b₎ / (V ⋅ g)</p>
                                 <p>ρ = ${Fb_val} ${unitF} / (${V_val} ${unitV} ⋅ ${g}) = ${dens_calc.toFixed(2)} ${unitDensity}</p>`;
        } else if (V === "") {
          var Fb_val = parseFloat(Fb);
          var dens_val = parseFloat(densidad);
          var V_calc = Fb_val / (dens_val * g);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Volumen (V):</strong></p>
                                 <p>V = F₍b₎ / (ρ ⋅ g)</p>
                                 <p>V = ${Fb_val} ${unitF} / (${dens_val} ${unitDensity} ⋅ ${g}) = ${V_calc.toFixed(2)} ${unitV}</p>`;
        }
        
      // Ecuación de Continuidad: A₁ ⋅ v₁ = A₂ ⋅ v₂
      } else if (formula === "Continuidad") {
        var A1 = document.getElementById("A1Cont").value;
        var v1 = document.getElementById("v1").value;
        var A2 = document.getElementById("A2Cont").value;
        var v2 = document.getElementById("v2").value;
        var countEmpty = 0;
        if (A1 === "") countEmpty++;
        if (v1 === "") countEmpty++;
        if (A2 === "") countEmpty++;
        if (v2 === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Continuidad, ingresa exactamente tres valores."; return; }
        if (A1 === "") {
          var v1_val = parseFloat(v1);
          var A2_val = parseFloat(A2);
          var v2_val = parseFloat(v2);
          var A1_calc = (A2_val * v2_val) / v1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área 1 (A₁):</strong></p>
                                 <p>A₁ = (A₂ ⋅ v₂) / v₁</p>
                                 <p>A₁ = (${A2_val} ⋅ ${v2_val}) / ${v1_val} = ${A1_calc.toFixed(2)}</p>`;
        } else if (v1 === "") {
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var v2_val = parseFloat(v2);
          var v1_calc = (A2_val * v2_val) / A1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad 1 (v₁):</strong></p>
                                 <p>v₁ = (A₂ ⋅ v₂) / A₁</p>
                                 <p>v₁ = (${A2_val} ⋅ ${v2_val}) / ${A1_val} = ${v1_calc.toFixed(2)}</p>`;
        } else if (A2 === "") {
          var A1_val = parseFloat(A1);
          var v1_val = parseFloat(v1);
          var v2_val = parseFloat(v2);
          var A2_calc = (A1_val * v1_val) / v2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área 2 (A₂):</strong></p>
                                 <p>A₂ = (A₁ ⋅ v₁) / v₂</p>
                                 <p>A₂ = (${A1_val} ⋅ ${v1_val}) / ${v2_val} = ${A2_calc.toFixed(2)}</p>`;
        } else if (v2 === "") {
          var A1_val = parseFloat(A1);
          var v1_val = parseFloat(v1);
          var A2_val = parseFloat(A2);
          var v2_calc = (A1_val * v1_val) / A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad 2 (v₂):</strong></p>
                                 <p>v₂ = (A₁ ⋅ v₁) / A₂</p>
                                 <p>v₂ = (${A1_val} ⋅ ${v1_val}) / ${A2_val} = ${v2_calc.toFixed(2)}</p>`;
        }
        
      // Ecuación de Bernoulli: P + ½ρv² + ρgh = C
      } else if (formula === "Bernoulli") {
        var C = document.getElementById("constante").value;
        var P = document.getElementById("presionB").value;
        var v = document.getElementById("velocidadB").value;
        var h = document.getElementById("altura").value;
        var dens = document.getElementById("densidadB").value;
        // Si densidad se deja en blanco, se usa valor por defecto
        if (dens === "") {
          if (sistema === "MKS") { dens = 1000; }
          else if (sistema === "Ingles") { dens = 62.4; }
          else if (sistema === "CGS") { dens = 1; }
        } else {
          dens = parseFloat(dens);
        }
        var countEmpty = 0;
        if (C === "") countEmpty++;
        if (P === "") countEmpty++;
        if (v === "") countEmpty++;
        if (h === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Bernoulli, ingresa exactamente tres valores y deja uno vacío (la densidad se usa o se asigna por defecto)."; return; }
        if (C === "") {
          var P_val = parseFloat(P);
          var v_val = parseFloat(v);
          var h_val = parseFloat(h);
          var C_calc = P_val + 0.5 * dens * Math.pow(v_val, 2) + dens * g * h_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de la Constante (C):</strong></p>
                                 <p>C = P + ½ρv² + ρgh</p>
                                 <p>C = ${P_val} ${unitP} + 0.5 ⋅ ${dens} ⋅ (${v_val}²) + ${dens} ⋅ ${g} ⋅ ${h_val} = ${C_calc.toFixed(2)} ${unitP}</p>`;
        } else if (P === "") {
          var C_val = parseFloat(C);
          var v_val = parseFloat(v);
          var h_val = parseFloat(h);
          var P_calc = C_val - 0.5 * dens * Math.pow(v_val, 2) - dens * g * h_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Presión (P):</strong></p>
                                 <p>P = C − ½ρv² − ρgh</p>
                                 <p>P = ${C_val} − 0.5 ⋅ ${dens} ⋅ (${v_val}²) − ${dens} ⋅ ${g} ⋅ ${h_val} = ${P_calc.toFixed(2)} ${unitP}</p>`;
        } else if (v === "") {
          var C_val = parseFloat(C);
          var P_val = parseFloat(P);
          var h_val = parseFloat(h);
          var inside = (C_val - P_val - dens * g * h_val) * 2 / dens;
          if (inside < 0) { resultado.innerHTML = "No es posible calcular una velocidad real con los valores proporcionados."; return; }
          var v_calc = Math.sqrt(inside);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad (v):</strong></p>
                                 <p>v = √((C − P − ρgh) ⋅ 2/ρ)</p>
                                 <p>v = √((${C_val} − ${P_val} − ${dens} ⋅ ${g} ⋅ ${h_val}) ⋅ 2 / ${dens}) = ${v_calc.toFixed(2)}</p>`;
        } else if (h === "") {
          var C_val = parseFloat(C);
          var P_val = parseFloat(P);
          var v_val = parseFloat(v);
          var h_calc = (C_val - P_val - 0.5 * dens * Math.pow(v_val, 2)) / (dens * g);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Altura (h):</strong></p>
                                 <p>h = (C − P − ½ρv²) / (ρg)</p>
                                 <p>h = (${C_val} − ${P_val} − 0.5 ⋅ ${dens} ⋅ (${v_val}²)) / (${dens} ⋅ ${g}) = ${h_calc.toFixed(2)}</p>`;
        }
      }
    }
  }
// ==========================================
// Función que actualiza el formulario principal
// ==========================================
function actualizarFormulario() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var formulario = document.getElementById("formulario");
    var html = "";
    
    if (tipo === "MRU") {
      // Cinemática - MRU: d = v ⋅ t
      html = `
        <label id="labelEspacio">Espacio (d):</label>
        <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
        
        <label id="labelVelocidad">Velocidad (v):</label>
        <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
      `;
    } else if (tipo === "MRUA") {
      // Cinemática - MRUA: v_f = v_i + a ⋅ t
      html = `
        <label id="labelVi">Velocidad Inicial (v<sub>i</sub>):</label>
        <input type="number" step="any" id="vi" placeholder="Ingresa v₍i₎ o déjalo vacío">
        
        <label id="labelVf">Velocidad Final (v<sub>f</sub>):</label>
        <input type="number" step="any" id="vf" placeholder="Ingresa v₍f₎ o déjalo vacío">
        
        <label id="labelAceleracion">Aceleración (a):</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
        
        <label id="labelTiempo">Tiempo (t) en s:</label>
        <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
      `;
    } else if (tipo === "Dinamica") {
      // Dinámica: submenú para fórmulas de dinámica
      html = `
        <p>Selecciona la fórmula dinámica:</p>
        <select id="formulaDinamica" onchange="actualizarFormularioDinamica()">
          <option value="Fuerza">Fuerza (F = m ⋅ a)</option>
          <option value="Peso">Peso (W = m ⋅ g)</option>
          <option value="Rozamiento">Fuerza de Rozamiento (f = μ ⋅ N)</option>
          <option value="Trabajo">Trabajo (W = F ⋅ d ⋅ cos(θ))</option>
        </select>
        <div id="formularioDinamica"></div>
      `;
    } else if (tipo === "Hidraulica") {
      // Hidráulica: submenú para fórmulas hidráulicas
      html = `
        <p>Selecciona la fórmula hidráulica:</p>
        <select id="formulaHidraulica" onchange="actualizarFormularioHidraulica()">
          <option value="Presion">Presión (P = F / A)</option>
          <option value="Pascal">Principio de Pascal (F₂ = (F₁/A₁) ⋅ A₂)</option>
          <option value="Arquimedes">Principio de Arquímedes (F₍b₎ = ρ ⋅ V ⋅ g)</option>
          <option value="Continuidad">Ecuación de Continuidad (A₁⋅v₁ = A₂⋅v₂)</option>
          <option value="Bernoulli">Ecuación de Bernoulli (P + ½ρv² + ρgh = C)</option>
        </select>
        <div id="formularioHidraulica"></div>
      `;
    } else if (tipo === "Termodinamica") {
      // Termodinámica: submenú para fórmulas termodinámicas
      html = `
        <p>Selecciona la fórmula de Termodinámica:</p>
        <select id="formulaTermodinamica" onchange="actualizarFormularioTermodinamica()">
          <option value="CalorEspecifico">Calor Específico (Q = m ⋅ c ⋅ ΔT)</option>
          <option value="PrimeraLey">Primera Ley (ΔU = Q − W)</option>
          <option value="GasesIdeales">Ley de los Gases Ideales (P ⋅ V = n ⋅ R ⋅ T)</option>
        </select>
        <div id="formularioTermodinamica"></div>
      `;
    }
    
    formulario.innerHTML = html;
    
    if (tipo === "Dinamica") {
      actualizarFormularioDinamica();
    } else if (tipo === "Hidraulica") {
      actualizarFormularioHidraulica();
    } else if (tipo === "Termodinamica") {
      actualizarFormularioTermodinamica();
    } else {
      actualizarEtiquetasNoDinamica();
    }
  }
  
  // ==========================================
  // Funciones para actualizar subformularios
  // ==========================================
  
  // Actualiza el formulario para Dinámica
  function actualizarFormularioDinamica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaDinamica").value;
    var container = document.getElementById("formularioDinamica");
    var unitM, unitA, unitF, unitD, g;
    
    if (sistema === "MKS") {
      unitM = "kg"; unitA = "m/s²"; unitF = "N"; unitD = "m"; g = 9.8;
    } else if (sistema === "Ingles") {
      unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; unitD = "ft"; g = 32.174;
    } else if (sistema === "CGS") {
      unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; unitD = "cm"; g = 980;
    }
    
    var html = "";
    if (formula === "Fuerza") {
      html = `
        <label id="labelFuerza">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Fuerza" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelMasa">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masa" placeholder="Ingresa m o déjalo vacío">
        
        <label id="labelAceleracionD">Aceleración (a) en ${unitA}:</label>
        <input type="number" step="any" id="aceleracionD" placeholder="Ingresa a o déjalo vacío">
      `;
    } else if (formula === "Peso") {
      html = `
        <label id="labelPeso">Peso (W) en ${unitF}:</label>
        <input type="number" step="any" id="peso" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelMasaP">Masa (m) en ${unitM}:</label>
        <input type="number" step="any" id="masaP" placeholder="Ingresa m o déjalo vacío">
        
        <p>g = ${g} ${unitA}</p>
      `;
    } else if (formula === "Rozamiento") {
      html = `
        <label id="labelRozamiento">Fuerza de Rozamiento (f) en ${unitF}:</label>
        <input type="number" step="any" id="rozamiento" placeholder="Ingresa f o déjalo vacío">
        
        <label id="labelMu">Coeficiente de Rozamiento (μ):</label>
        <input type="number" step="any" id="mu" placeholder="Ingresa μ o déjalo vacío">
        
        <label id="labelNormal">Fuerza Normal (N) en ${unitF}:</label>
        <input type="number" step="any" id="normal" placeholder="Ingresa N o déjalo vacío">
      `;
    } else if (formula === "Trabajo") {
      html = `
        <label id="labelTrabajo">Trabajo (W) en la unidad correspondiente:</label>
        <input type="number" step="any" id="trabajo" placeholder="Ingresa W o déjalo vacío">
        
        <label id="labelFTrabajo">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="Ftrabajo" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelDistancia">Distancia (d) en ${unitD}:</label>
        <input type="number" step="any" id="distancia" placeholder="Ingresa d o déjalo vacío">
        
        <label id="labelAngulo">Ángulo (θ) en grados:</label>
        <input type="number" step="any" id="angulo" placeholder="Ingresa θ o déjalo vacío">
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza el formulario para Hidráulica
  function actualizarFormularioHidraulica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaHidraulica").value;
    var container = document.getElementById("formularioHidraulica");
    var html = "";
    var unitP, unitF, unitA;
    var unitM, unitDensity, unitV;
    var g;
    
    if (sistema === "MKS") {
      unitP = "Pa"; unitF = "N"; unitA = "m²";
      unitM = "kg"; unitDensity = "kg/m³"; unitV = "m³";
      g = 9.8;
    } else if (sistema === "Ingles") {
      unitP = "lbf/ft²"; unitF = "lbf"; unitA = "ft²";
      unitM = "lbm"; unitDensity = "lbm/ft³"; unitV = "ft³";
      g = 32.174;
    } else if (sistema === "CGS") {
      unitP = "dyn/cm²"; unitF = "dyn"; unitA = "cm²";
      unitM = "g"; unitDensity = "g/cm³"; unitV = "cm³";
      g = 980;
    }
    
    if (formula === "Presion") {
      html = `
        <label id="labelPresion">Presión (P) en ${unitP}:</label>
        <input type="number" step="any" id="presion" placeholder="Ingresa P o déjalo vacío">
        
        <label id="labelFuerzaH">Fuerza (F) en ${unitF}:</label>
        <input type="number" step="any" id="fuerzaH" placeholder="Ingresa F o déjalo vacío">
        
        <label id="labelArea">Área (A) en ${unitA}:</label>
        <input type="number" step="any" id="area" placeholder="Ingresa A o déjalo vacío">
      `;
    } else if (formula === "Pascal") {
      html = `
        <label id="labelF1">Fuerza Inicial (F₁) en ${unitF}:</label>
        <input type="number" step="any" id="F1" placeholder="Ingresa F₁ o déjalo vacío">
        
        <label id="labelA1">Área Inicial (A₁) en ${unitA}:</label>
        <input type="number" step="any" id="A1" placeholder="Ingresa A₁ o déjalo vacío">
        
        <label id="labelA2">Área Final (A₂) en ${unitA}:</label>
        <input type="number" step="any" id="A2" placeholder="Ingresa A₂ o déjalo vacío">
        
        <label id="labelF2">Fuerza Final (F₂) en ${unitF}:</label>
        <input type="number" step="any" id="F2" placeholder="Ingresa F₂ o déjalo vacío">
      `;
    } else if (formula === "Arquimedes") {
      html = `
        <label id="labelFb">Fuerza de Arquímedes (F<sub>b</sub>) en ${unitF}:</label>
        <input type="number" step="any" id="Fb" placeholder="Ingresa F₍b₎ o déjalo vacío">
        
        <label id="labelDensidad">Densidad (ρ) en ${unitDensity}:</label>
        <input type="number" step="any" id="densidad" placeholder="Ingresa ρ o déjalo vacío">
        
        <label id="labelVolumen">Volumen (V) en ${unitV}:</label>
        <input type="number" step="any" id="volumen" placeholder="Ingresa V o déjalo vacío">
        
        <p>g = ${g} ${sistema === "CGS" ? "cm/s²" : (sistema === "Ingles" ? "ft/s²" : "m/s²")}</p>
      `;
    } else if (formula === "Continuidad") {
      html = `
        <label id="labelA1Cont">Área 1 (A₁) en ${unitA}:</label>
        <input type="number" step="any" id="A1Cont" placeholder="Ingresa A₁ o déjalo vacío">
        
        <label id="labelV1">Velocidad 1 (v₁) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="v1" placeholder="Ingresa v₁ o déjalo vacío">
        
        <label id="labelA2Cont">Área 2 (A₂) en ${unitA}:</label>
        <input type="number" step="any" id="A2Cont" placeholder="Ingresa A₂ o déjalo vacío">
        
        <label id="labelV2">Velocidad 2 (v₂) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="v2" placeholder="Ingresa v₂ o déjalo vacío">
      `;
    } else if (formula === "Bernoulli") {
      html = `
        <label id="labelConstante">Constante (C) en ${unitP}:</label>
        <input type="number" step="any" id="constante" placeholder="Ingresa C o déjalo vacío">
        
        <label id="labelPresionB">Presión (P) en ${unitP}:</label>
        <input type="number" step="any" id="presionB" placeholder="Ingresa P o déjalo vacío">
        
        <label id="labelVelocidadB">Velocidad (v) en ${sistema === "MKS" ? "m/s" : (sistema === "Ingles" ? "ft/s" : "cm/s")}:</label>
        <input type="number" step="any" id="velocidadB" placeholder="Ingresa v o déjalo vacío">
        
        <label id="labelAltura">Altura (h) en ${sistema === "MKS" ? "m" : (sistema === "Ingles" ? "ft" : "cm")}:</label>
        <input type="number" step="any" id="altura" placeholder="Ingresa h o déjalo vacío">
        
        <label id="labelDensidadB">Densidad (ρ) en ${unitDensity}:</label>
        <input type="number" step="any" id="densidadB" placeholder="Ingresa ρ (opcional)">
        <p>g = ${g} ${sistema === "CGS" ? "cm/s²" : (sistema === "Ingles" ? "ft/s²" : "m/s²")}</p>
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza el formulario para Termodinámica
  function actualizarFormularioTermodinamica() {
    var sistema = document.getElementById("sistema").value;
    var formula = document.getElementById("formulaTermodinamica").value;
    var container = document.getElementById("formularioTermodinamica");
    var html = "";
    
    // Definición de unidades para Termodinámica según el sistema
    var unitMass, unit_c, unitDeltaT, unitQ;
    var unitDeltaU, unitQ_PL, unitW; // Para la Primera Ley
    var unitP, unitV, unit_n, unitT, R;
    
    if (sistema === "MKS") {
      // Calor Específico: masa en kg, c en J/(kg·K), ΔT en K, Q en J.
      unitMass = "kg"; unit_c = "J/(kg·K)"; unitDeltaT = "K"; unitQ = "J";
      // Primera Ley: ΔU, Q, W en J.
      unitDeltaU = "J"; unitQ_PL = "J"; unitW = "J";
      // Gases Ideales: P en Pa, V en m³, n en mol, T en K, R=8.314.
      unitP = "Pa"; unitV = "m³"; unit_n = "mol"; unitT = "K"; R = 8.314;
    } else if (sistema === "Ingles") {
      // En unidades inglesas: masa en lb, c en BTU/(lb·°F), ΔT en °F, Q en BTU.
      unitMass = "lb"; unit_c = "BTU/(lb·°F)"; unitDeltaT = "°F"; unitQ = "BTU";
      // Primera Ley: en BTU.
      unitDeltaU = "BTU"; unitQ_PL = "BTU"; unitW = "BTU";
      // Gases Ideales: P en psi, V en ft³, n en lbmol, T en °R, R=10.7316.
      unitP = "psi"; unitV = "ft³"; unit_n = "lbmol"; unitT = "°R"; R = 10.7316;
    } else if (sistema === "CGS") {
      // En CGS: masa en g, c en erg/(g·K), ΔT en K, Q en erg.
      unitMass = "g"; unit_c = "erg/(g·K)"; unitDeltaT = "K"; unitQ = "erg";
      // Primera Ley: en erg.
      unitDeltaU = "erg"; unitQ_PL = "erg"; unitW = "erg";
      // Gases Ideales: P en dyn/cm², V en cm³, n en mol, T en K, R = 8.314e7 (aprox).
      unitP = "dyn/cm²"; unitV = "cm³"; unit_n = "mol"; unitT = "K"; R = 8.314e7;
    }
    
    if (formula === "CalorEspecifico") {
      html = `
        <label id="labelQTerm">Calor (Q) en ${unitQ}:</label>
        <input type="number" step="any" id="QTerm" placeholder="Ingresa Q o déjalo vacío">
        
        <label id="labelMassTerm">Masa (m) en ${unitMass}:</label>
        <input type="number" step="any" id="mTerm" placeholder="Ingresa m o déjalo vacío">
        
        <label id="labelCTerm">Calor específico (c) en ${unit_c}:</label>
        <input type="number" step="any" id="cTerm" placeholder="Ingresa c o déjalo vacío">
        
        <label id="labelDeltaTTerm">Cambio de temperatura (ΔT) en ${unitDeltaT}:</label>
        <input type="number" step="any" id="dTTerm" placeholder="Ingresa ΔT o déjalo vacío">
      `;
    } else if (formula === "PrimeraLey") {
      html = `
        <label id="labelDeltaUTerm">Cambio de Energía Interna (ΔU) en ${unitDeltaU}:</label>
        <input type="number" step="any" id="dUTerm" placeholder="Ingresa ΔU o déjalo vacío">
        
        <label id="labelQTermPL">Calor (Q) en ${unitQ_PL}:</label>
        <input type="number" step="any" id="QTermPL" placeholder="Ingresa Q o déjalo vacío">
        
        <label id="labelWTerm">Trabajo (W) en ${unitW}:</label>
        <input type="number" step="any" id="WTerm" placeholder="Ingresa W o déjalo vacío">
      `;
    } else if (formula === "GasesIdeales") {
      html = `
        <label id="labelPTerm">Presión (P) en ${unitP}:</label>
        <input type="number" step="any" id="PTerm" placeholder="Ingresa P o déjalo vacío">
        
        <label id="labelVTerm">Volumen (V) en ${unitV}:</label>
        <input type="number" step="any" id="VTerm" placeholder="Ingresa V o déjalo vacío">
        
        <label id="labelnTerm">Cantidad de sustancia (n) en ${unit_n}:</label>
        <input type="number" step="any" id="nTerm" placeholder="Ingresa n o déjalo vacío">
        
        <label id="labelTTerm">Temperatura (T) en ${unitT}:</label>
        <input type="number" step="any" id="TTerm" placeholder="Ingresa T o déjalo vacío">
      `;
    }
    container.innerHTML = html;
  }
  
  // Actualiza etiquetas para formularios sencillos (MRU y MRUA)
  function actualizarEtiquetasNoDinamica() {
    var sistema = document.getElementById("sistema").value;
    var unitD, unitV;
    if (sistema === "MKS") { unitD = "m"; unitV = "m/s"; }
    else if (sistema === "Ingles") { unitD = "ft"; unitV = "ft/s"; }
    else if (sistema === "CGS") { unitD = "cm"; unitV = "cm/s"; }
    if (document.getElementById("labelEspacio"))
      document.getElementById("labelEspacio").innerText = "Espacio (d) en " + unitD + ":";
    if (document.getElementById("labelVelocidad"))
      document.getElementById("labelVelocidad").innerText = "Velocidad (v) en " + unitV + ":";
  }
  
  // ==========================================
  // Función principal de cálculo
  // ==========================================
  function calcular() {
    var sistema = document.getElementById("sistema").value;
    var tipo = document.getElementById("tipoCalculo").value;
    var resultado = document.getElementById("resultado");
    
    // ----------------------------
    // Cinemática - MRU
    // ----------------------------
    if (tipo === "MRU") {
      var espacio = document.getElementById("espacio").value;
      var tiempo = document.getElementById("tiempo").value;
      var velocidad = document.getElementById("velocidad").value;
      var countEmpty = 0;
      if (espacio === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (velocidad === "") countEmpty++;
      if (countEmpty !== 1) { resultado.innerHTML = "Para MRU, ingresa exactamente dos valores."; return; }
      var unitT = "s", unitV, unitD;
      if (sistema === "MKS") { unitV = "m/s"; unitD = "m"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitD = "ft"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitD = "cm"; }
      
      if (espacio === "") {
        var v = parseFloat(velocidad);
        var t = parseFloat(tiempo);
        var d = v * t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Espacio (d):</strong></p>
                               <p>d = v ⋅ t</p>
                               <p>d = ${v} ${unitV} ⋅ ${t} ${unitT} = ${d.toFixed(2)} ${unitD}</p>`;
      } else if (tiempo === "") {
        var d = parseFloat(espacio);
        var v = parseFloat(velocidad);
        if (v === 0) { resultado.innerHTML = "La velocidad no puede ser 0."; return; }
        var t = d / v;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Tiempo (t):</strong></p>
                               <p>t = d / v</p>
                               <p>t = ${d} ${unitD} / ${v} ${unitV} = ${t.toFixed(2)} ${unitT}</p>`;
      } else if (velocidad === "") {
        var d = parseFloat(espacio);
        var t = parseFloat(tiempo);
        if (t === 0) { resultado.innerHTML = "El tiempo no puede ser 0."; return; }
        var v = d / t;
        resultado.innerHTML = `<p><strong>MRU: Cálculo de Velocidad (v):</strong></p>
                               <p>v = d / t</p>
                               <p>v = ${d} ${unitD} / ${t} ${unitT} = ${v.toFixed(2)} ${unitV}</p>`;
      }
      
    // ----------------------------
    // Cinemática - MRUA
    // ----------------------------
    } else if (tipo === "MRUA") {
      var vi = document.getElementById("vi").value;
      var vf = document.getElementById("vf").value;
      var aceleracion = document.getElementById("aceleracion").value;
      var tiempo = document.getElementById("tiempo").value;
      var countEmpty = 0;
      if (vi === "") countEmpty++;
      if (vf === "") countEmpty++;
      if (aceleracion === "") countEmpty++;
      if (tiempo === "") countEmpty++;
      if (countEmpty !== 1) { resultado.innerHTML = "Para MRUA, ingresa exactamente tres valores y deja uno vacío."; return; }
      var unitT = "s", unitV, unitA;
      if (sistema === "MKS") { unitV = "m/s"; unitA = "m/s²"; }
      else if (sistema === "Ingles") { unitV = "ft/s"; unitA = "ft/s²"; }
      else if (sistema === "CGS") { unitV = "cm/s"; unitA = "cm/s²"; }
      
      if (vi === "") {
        var vf_val = parseFloat(vf);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vi_calc = vf_val - a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Inicial (v<sub>i</sub>):</strong></p>
                               <p>v<sub>i</sub> = v<sub>f</sub> − a ⋅ t</p>
                               <p>v<sub>i</sub> = ${vf_val} ${unitV} − ${a} ${unitA} ⋅ ${t} ${unitT} = ${vi_calc.toFixed(2)} ${unitV}</p>`;
      } else if (vf === "") {
        var vi_val = parseFloat(vi);
        var a = parseFloat(aceleracion);
        var t = parseFloat(tiempo);
        var vf_calc = vi_val + a * t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Velocidad Final (v<sub>f</sub>):</strong></p>
                               <p>v<sub>f</sub> = v<sub>i</sub> + a ⋅ t</p>
                               <p>v<sub>f</sub> = ${vi_val} ${unitV} + ${a} ${unitA} ⋅ ${t} ${unitT} = ${vf_calc.toFixed(2)} ${unitV}</p>`;
      } else if (aceleracion === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (tiempo === "" || parseFloat(tiempo) == 0) { resultado.innerHTML = "El tiempo no puede ser 0 para calcular la aceleración."; return; }
        var t = parseFloat(tiempo);
        var a_calc = (vf_val - vi_val) / t;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Aceleración (a):</strong></p>
                               <p>a = (v<sub>f</sub> − v<sub>i</sub>) / t</p>
                               <p>a = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${t} ${unitT} = ${a_calc.toFixed(2)} ${unitA}</p>`;
      } else if (tiempo === "") {
        var vi_val = parseFloat(vi);
        var vf_val = parseFloat(vf);
        if (aceleracion === "" || parseFloat(aceleracion) == 0) { resultado.innerHTML = "La aceleración no puede ser 0 para calcular el tiempo."; return; }
        var a = parseFloat(aceleracion);
        var t_calc = (vf_val - vi_val) / a;
        resultado.innerHTML = `<p><strong>MRUA: Cálculo de Tiempo (t):</strong></p>
                               <p>t = (v<sub>f</sub> − v<sub>i</sub>) / a</p>
                               <p>t = (${vf_val} ${unitV} − ${vi_val} ${unitV}) / ${a} ${unitA} = ${t_calc.toFixed(2)} ${unitT}</p>`;
      }
      
    // ----------------------------
    // Dinámica
    // ----------------------------
    } else if (tipo === "Dinamica") {
      var formula = document.getElementById("formulaDinamica").value;
      // Se procesan las fórmulas de dinámica según el código implementado en actualizarFormularioDinamica()
      if (formula === "Fuerza") {
        var F = document.getElementById("Fuerza").value;
        var m = document.getElementById("masa").value;
        var a = document.getElementById("aceleracionD").value;
        var countEmpty = 0;
        if (F === "") countEmpty++;
        if (m === "") countEmpty++;
        if (a === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Fuerza, ingresa exactamente dos valores."; return; }
        var unitM, unitA, unitF;
        if (sistema === "MKS") { unitM = "kg"; unitA = "m/s²"; unitF = "N"; }
        else if (sistema === "Ingles") { unitM = "lbm"; unitA = "ft/s²"; unitF = "lbf"; }
        else if (sistema === "CGS") { unitM = "g"; unitA = "cm/s²"; unitF = "dyn"; }
        
        if (F === "") {
          var m_val = parseFloat(m);
          var a_val = parseFloat(a);
          var F_calc = m_val * a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F):</strong></p>
                                 <p>F = m ⋅ a</p>
                                 <p>F = ${m_val} ${unitM} ⋅ ${a_val} ${unitA} = ${F_calc.toFixed(2)} ${unitF}</p>`;
        } else if (m === "") {
          var F_val = parseFloat(F);
          var a_val = parseFloat(a);
          if (a_val === 0) { resultado.innerHTML = "La aceleración no puede ser 0."; return; }
          var m_calc = F_val / a_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = F / a</p>
                                 <p>m = ${F_val} ${unitF} / ${a_val} ${unitA} = ${m_calc.toFixed(2)} ${unitM}</p>`;
        } else if (a === "") {
          var F_val = parseFloat(F);
          var m_val = parseFloat(m);
          if (m_val === 0) { resultado.innerHTML = "La masa no puede ser 0."; return; }
          var a_calc = F_val / m_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Aceleración (a):</strong></p>
                                 <p>a = F / m</p>
                                 <p>a = ${F_val} ${unitF} / ${m_val} ${unitM} = ${a_calc.toFixed(2)} ${unitA}</p>`;
        }
      } else if (formula === "Peso") {
        var W = document.getElementById("peso").value;
        var m = document.getElementById("masaP").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (m === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Peso, ingresa exactamente un valor desconocido."; return; }
        var g;
        var unitM, unitF;
        if (sistema === "MKS") { g = 9.8; unitM = "kg"; unitF = "N"; }
        else if (sistema === "Ingles") { g = 32.174; unitM = "lbm"; unitF = "lbf"; }
        else if (sistema === "CGS") { g = 980; unitM = "g"; unitF = "dyn"; }
        if (W === "") {
          var m_val = parseFloat(m);
          var W_calc = m_val * g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Peso (W):</strong></p>
                                 <p>W = m ⋅ g</p>
                                 <p>W = ${m_val} ${unitM} ⋅ ${g} = ${W_calc.toFixed(2)} ${unitF}</p>`;
        } else if (m === "") {
          var W_val = parseFloat(W);
          if (g === 0) { resultado.innerHTML = "La gravedad no puede ser 0."; return; }
          var m_calc = W_val / g;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = W / g</p>
                                 <p>m = ${W_val} ${unitF} / ${g} = ${m_calc.toFixed(2)} ${unitM}</p>`;
        }
      } else if (formula === "Rozamiento") {
        var f = document.getElementById("rozamiento").value;
        var mu = document.getElementById("mu").value;
        var N = document.getElementById("normal").value;
        var countEmpty = 0;
        if (f === "") countEmpty++;
        if (mu === "") countEmpty++;
        if (N === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Fuerza de Rozamiento, ingresa exactamente dos valores."; return; }
        if (f === "") {
          var mu_val = parseFloat(mu);
          var N_val = parseFloat(N);
          var f_calc = mu_val * N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza de Rozamiento (f):</strong></p>
                                 <p>f = μ ⋅ N</p>
                                 <p>f = ${mu_val} ⋅ ${N_val} = ${f_calc.toFixed(2)}</p>`;
        } else if (mu === "") {
          var f_val = parseFloat(f);
          var N_val = parseFloat(N);
          if (N_val === 0) { resultado.innerHTML = "La fuerza normal no puede ser 0."; return; }
          var mu_calc = f_val / N_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Coeficiente de Rozamiento (μ):</strong></p>
                                 <p>μ = f / N</p>
                                 <p>μ = ${f_val} / ${N_val} = ${mu_calc.toFixed(2)}</p>`;
        } else if (N === "") {
          var f_val = parseFloat(f);
          var mu_val = parseFloat(mu);
          if (mu_val === 0) { resultado.innerHTML = "El coeficiente de rozamiento no puede ser 0."; return; }
          var N_calc = f_val / mu_val;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza Normal (N):</strong></p>
                                 <p>N = f / μ</p>
                                 <p>N = ${f_val} / ${mu_val} = ${N_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Trabajo") {
        var W = document.getElementById("trabajo").value;
        var F = document.getElementById("Ftrabajo").value;
        var d = document.getElementById("distancia").value;
        var theta = document.getElementById("angulo").value;
        var countEmpty = 0;
        if (W === "") countEmpty++;
        if (F === "") countEmpty++;
        if (d === "") countEmpty++;
        if (theta === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Trabajo, ingresa exactamente tres valores y deja uno vacío."; return; }
        if (W === "") {
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          var W_calc = F_val * d_val * Math.cos(theta_rad);
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Trabajo (W):</strong></p>
                                 <p>W = F ⋅ d ⋅ cos(θ)</p>
                                 <p>W = ${F_val} ⋅ ${d_val} ⋅ cos(${theta_val}°) = ${W_calc.toFixed(2)}</p>`;
        } else if (F === "") {
          var W_val = parseFloat(W);
          var d_val = parseFloat(d);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (Math.cos(theta_rad) === 0) { resultado.innerHTML = "El coseno del ángulo no puede ser 0 para calcular la fuerza."; return; }
          var F_calc = W_val / (d_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Fuerza (F) en Trabajo:</strong></p>
                                 <p>F = W / (d ⋅ cos(θ))</p>
                                 <p>F = ${W_val} / (${d_val} ⋅ cos(${theta_val}°)) = ${F_calc.toFixed(2)}</p>`;
        } else if (d === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var theta_val = parseFloat(theta);
          var theta_rad = theta_val * Math.PI / 180;
          if (F_val * Math.cos(theta_rad) === 0) { resultado.innerHTML = "El producto F ⋅ cos(θ) no puede ser 0."; return; }
          var d_calc = W_val / (F_val * Math.cos(theta_rad));
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Distancia (d):</strong></p>
                                 <p>d = W / (F ⋅ cos(θ))</p>
                                 <p>d = ${W_val} / (${F_val} ⋅ cos(${theta_val}°)) = ${d_calc.toFixed(2)}</p>`;
        } else if (theta === "") {
          var W_val = parseFloat(W);
          var F_val = parseFloat(F);
          var d_val = parseFloat(d);
          if (F_val * d_val === 0) { resultado.innerHTML = "El producto F ⋅ d no puede ser 0."; return; }
          var cos_theta = W_val / (F_val * d_val);
          if (cos_theta < -1 || cos_theta > 1) { resultado.innerHTML = "No es posible calcular un ángulo válido con los valores proporcionados."; return; }
          var theta_calc = Math.acos(cos_theta) * 180 / Math.PI;
          resultado.innerHTML = `<p><strong>Dinámica - Cálculo de Ángulo (θ):</strong></p>
                                 <p>θ = arccos(W / (F ⋅ d))</p>
                                 <p>θ = arccos(${W_val} / (${F_val} ⋅ ${d_val})) = ${theta_calc.toFixed(2)}°</p>`;
        }
      }
    
    // ----------------------------
    // Hidráulica
    // ----------------------------
    } else if (tipo === "Hidraulica") {
      var formula = document.getElementById("formulaHidraulica").value;
      // Se procesan las fórmulas hidráulicas según lo definido en actualizarFormularioHidraulica()
      if (formula === "Presion") {
        var P = document.getElementById("presion").value;
        var F = document.getElementById("fuerzaH").value;
        var A = document.getElementById("area").value;
        var countEmpty = 0;
        if (P === "") countEmpty++;
        if (F === "") countEmpty++;
        if (A === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Presión, ingresa exactamente dos valores."; return; }
        var unitP, unitF, unitA;
        if (sistema === "MKS") { unitP = "Pa"; unitF = "N"; unitA = "m²"; }
        else if (sistema === "Ingles") { unitP = "lbf/ft²"; unitF = "lbf"; unitA = "ft²"; }
        else if (sistema === "CGS") { unitP = "dyn/cm²"; unitF = "dyn"; unitA = "cm²"; }
        
        if (P === "") {
          var F_val = parseFloat(F);
          var A_val = parseFloat(A);
          var P_calc = F_val / A_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Presión (P):</strong></p>
                                 <p>P = F / A</p>
                                 <p>P = ${F_val} ${unitF} / ${A_val} ${unitA} = ${P_calc.toFixed(2)} ${unitP}</p>`;
        } else if (F === "") {
          var P_val = parseFloat(P);
          var A_val = parseFloat(A);
          var F_calc = P_val * A_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza (F):</strong></p>
                                 <p>F = P ⋅ A</p>
                                 <p>F = ${P_val} ${unitP} ⋅ ${A_val} ${unitA} = ${F_calc.toFixed(2)} ${unitF}</p>`;
        } else if (A === "") {
          var P_val = parseFloat(P);
          var F_val = parseFloat(F);
          var A_calc = F_val / P_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área (A):</strong></p>
                                 <p>A = F / P</p>
                                 <p>A = ${F_val} ${unitF} / ${P_val} ${unitP} = ${A_calc.toFixed(2)} ${unitA}</p>`;
        }
      } else if (formula === "Pascal") {
        var F1 = document.getElementById("F1").value;
        var A1 = document.getElementById("A1").value;
        var A2 = document.getElementById("A2").value;
        var F2 = document.getElementById("F2").value;
        var countEmpty = 0;
        if (F1 === "") countEmpty++;
        if (A1 === "") countEmpty++;
        if (A2 === "") countEmpty++;
        if (F2 === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Pascal, ingresa exactamente tres valores y deja uno vacío."; return; }
        if (F2 === "") {
          var F1_val = parseFloat(F1);
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var F2_calc = (F1_val / A1_val) * A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza Final (F₂):</strong></p>
                                 <p>F₂ = (F₁ / A₁) ⋅ A₂</p>
                                 <p>F₂ = (${F1_val} / ${A1_val}) ⋅ ${A2_val} = ${F2_calc.toFixed(2)}</p>`;
        } else if (F1 === "") {
          var F2_val = parseFloat(F2);
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var F1_calc = (F2_val * A1_val) / A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza Inicial (F₁):</strong></p>
                                 <p>F₁ = (F₂ ⋅ A₁) / A₂</p>
                                 <p>F₁ = (${F2_val} ⋅ ${A1_val}) / ${A2_val} = ${F1_calc.toFixed(2)}</p>`;
        } else if (A1 === "") {
          var F1_val = parseFloat(F1);
          var F2_val = parseFloat(F2);
          var A2_val = parseFloat(A2);
          var A1_calc = (F1_val * A2_val) / F2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área Inicial (A₁):</strong></p>
                                 <p>A₁ = (F₁ ⋅ A₂) / F₂</p>
                                 <p>A₁ = (${F1_val} ⋅ ${A2_val}) / ${F2_val} = ${A1_calc.toFixed(2)}</p>`;
        } else if (A2 === "") {
          var F1_val = parseFloat(F1);
          var A1_val = parseFloat(A1);
          var F2_val = parseFloat(F2);
          var A2_calc = (F2_val * A1_val) / F1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área Final (A₂):</strong></p>
                                 <p>A₂ = (F₂ ⋅ A₁) / F₁</p>
                                 <p>A₂ = (${F2_val} ⋅ ${A1_val}) / ${F1_val} = ${A2_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Arquimedes") {
        var Fb = document.getElementById("Fb").value;
        var densidad = document.getElementById("densidad").value;
        var V = document.getElementById("volumen").value;
        var countEmpty = 0;
        if (Fb === "") countEmpty++;
        if (densidad === "") countEmpty++;
        if (V === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Arquímedes, ingresa exactamente dos valores."; return; }
        if (Fb === "") {
          var dens_val = parseFloat(densidad);
          var V_val = parseFloat(V);
          var Fb_calc = dens_val * V_val * g;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Fuerza de Arquímedes (F₍b₎):</strong></p>
                                 <p>F₍b₎ = ρ ⋅ V ⋅ g</p>
                                 <p>F₍b₎ = ${dens_val} ⋅ ${V_val} ⋅ ${g} = ${Fb_calc.toFixed(2)}</p>`;
        } else if (densidad === "") {
          var Fb_val = parseFloat(Fb);
          var V_val = parseFloat(V);
          var dens_calc = Fb_val / (V_val * g);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Densidad (ρ):</strong></p>
                                 <p>ρ = F₍b₎ / (V ⋅ g)</p>
                                 <p>ρ = ${Fb_val} / (${V_val} ⋅ ${g}) = ${dens_calc.toFixed(2)}</p>`;
        } else if (V === "") {
          var Fb_val = parseFloat(Fb);
          var dens_val = parseFloat(densidad);
          var V_calc = Fb_val / (dens_val * g);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Volumen (V):</strong></p>
                                 <p>V = F₍b₎ / (ρ ⋅ g)</p>
                                 <p>V = ${Fb_val} / (${dens_val} ⋅ ${g}) = ${V_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Continuidad") {
        var A1 = document.getElementById("A1Cont").value;
        var v1 = document.getElementById("v1").value;
        var A2 = document.getElementById("A2Cont").value;
        var v2 = document.getElementById("v2").value;
        var countEmpty = 0;
        if (A1 === "") countEmpty++;
        if (v1 === "") countEmpty++;
        if (A2 === "") countEmpty++;
        if (v2 === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Continuidad, ingresa exactamente tres valores."; return; }
        if (A1 === "") {
          var v1_val = parseFloat(v1);
          var A2_val = parseFloat(A2);
          var v2_val = parseFloat(v2);
          var A1_calc = (A2_val * v2_val) / v1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área 1 (A₁):</strong></p>
                                 <p>A₁ = (A₂ ⋅ v₂) / v₁</p>
                                 <p>A₁ = (${A2_val} ⋅ ${v2_val}) / ${v1_val} = ${A1_calc.toFixed(2)}</p>`;
        } else if (v1 === "") {
          var A1_val = parseFloat(A1);
          var A2_val = parseFloat(A2);
          var v2_val = parseFloat(v2);
          var v1_calc = (A2_val * v2_val) / A1_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad 1 (v₁):</strong></p>
                                 <p>v₁ = (A₂ ⋅ v₂) / A₁</p>
                                 <p>v₁ = (${A2_val} ⋅ ${v2_val}) / ${A1_val} = ${v1_calc.toFixed(2)}</p>`;
        } else if (A2 === "") {
          var A1_val = parseFloat(A1);
          var v1_val = parseFloat(v1);
          var v2_val = parseFloat(v2);
          var A2_calc = (A1_val * v1_val) / v2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Área 2 (A₂):</strong></p>
                                 <p>A₂ = (A₁ ⋅ v₁) / v₂</p>
                                 <p>A₂ = (${A1_val} ⋅ ${v1_val}) / ${v2_val} = ${A2_calc.toFixed(2)}</p>`;
        } else if (v2 === "") {
          var A1_val = parseFloat(A1);
          var v1_val = parseFloat(v1);
          var A2_val = parseFloat(A2);
          var v2_calc = (A1_val * v1_val) / A2_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad 2 (v₂):</strong></p>
                                 <p>v₂ = (A₁ ⋅ v₁) / A₂</p>
                                 <p>v₂ = (${A1_val} ⋅ ${v1_val}) / ${A2_val} = ${v2_calc.toFixed(2)}</p>`;
        }
      } else if (formula === "Bernoulli") {
        var C = document.getElementById("constante").value;
        var P = document.getElementById("presionB").value;
        var v = document.getElementById("velocidadB").value;
        var h = document.getElementById("altura").value;
        var dens = document.getElementById("densidadB").value;
        if (dens === "") {
          if (sistema === "MKS") { dens = 1000; }
          else if (sistema === "Ingles") { dens = 62.4; }
          else if (sistema === "CGS") { dens = 1; }
        } else { dens = parseFloat(dens); }
        var countEmpty = 0;
        if (C === "") countEmpty++;
        if (P === "") countEmpty++;
        if (v === "") countEmpty++;
        if (h === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Bernoulli, ingresa exactamente tres valores y deja uno vacío."; return; }
        if (C === "") {
          var P_val = parseFloat(P);
          var v_val = parseFloat(v);
          var h_val = parseFloat(h);
          var C_calc = P_val + 0.5 * dens * Math.pow(v_val, 2) + dens * 9.8 * h_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de la Constante (C):</strong></p>
                                 <p>C = P + ½ρv² + ρgh</p>
                                 <p>C = ${P_val} + 0.5 ⋅ ${dens} ⋅ (${v_val}²) + ${dens} ⋅ 9.8 ⋅ ${h_val} = ${C_calc.toFixed(2)}</p>`;
        } else if (P === "") {
          var C_val = parseFloat(C);
          var v_val = parseFloat(v);
          var h_val = parseFloat(h);
          var P_calc = C_val - 0.5 * dens * Math.pow(v_val, 2) - dens * 9.8 * h_val;
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Presión (P):</strong></p>
                                 <p>P = C − ½ρv² − ρgh</p>
                                 <p>P = ${C_val} − 0.5 ⋅ ${dens} ⋅ (${v_val}²) − ${dens} ⋅ 9.8 ⋅ ${h_val} = ${P_calc.toFixed(2)}</p>`;
        } else if (v === "") {
          var C_val = parseFloat(C);
          var P_val = parseFloat(P);
          var h_val = parseFloat(h);
          var inside = (C_val - P_val - dens * 9.8 * h_val) * 2 / dens;
          if (inside < 0) { resultado.innerHTML = "No es posible calcular una velocidad real."; return; }
          var v_calc = Math.sqrt(inside);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Velocidad (v):</strong></p>
                                 <p>v = √((C − P − ρgh) ⋅ 2/ρ)</p>
                                 <p>v = √((${C_val} − ${P_val} − ${dens}⋅9.8⋅${h_val}) ⋅ 2 / ${dens}) = ${v_calc.toFixed(2)}</p>`;
        } else if (h === "") {
          var C_val = parseFloat(C);
          var P_val = parseFloat(P);
          var v_val = parseFloat(v);
          var h_calc = (C_val - P_val - 0.5 * dens * Math.pow(v_val, 2)) / (dens * 9.8);
          resultado.innerHTML = `<p><strong>Hidráulica - Cálculo de Altura (h):</strong></p>
                                 <p>h = (C − P − ½ρv²) / (ρg)</p>
                                 <p>h = (${C_val} − ${P_val} − 0.5⋅${dens}⋅(${v_val}²)) / (${dens}⋅9.8) = ${h_calc.toFixed(2)}</p>`;
        }
      }
    
    // ----------------------------
    // Termodinámica
    // ----------------------------
    } else if (tipo === "Termodinamica") {
      var formula = document.getElementById("formulaTermodinamica").value;
      // Para Termodinámica se definen unidades según el sistema en actualizarFormularioTermodinamica()
      if (formula === "CalorEspecifico") {
        var Q = document.getElementById("QTerm").value;
        var m = document.getElementById("mTerm").value;
        var c = document.getElementById("cTerm").value;
        var dT = document.getElementById("dTTerm").value;
        var countEmpty = 0;
        if (Q === "") countEmpty++;
        if (m === "") countEmpty++;
        if (c === "") countEmpty++;
        if (dT === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para Calor Específico, ingresa exactamente tres valores y deja uno vacío."; return; }
        // Definir unidades según el sistema
        var unitQ, unitMass, unit_c, unitDeltaT;
        if (sistema === "MKS") { unitQ = "J"; unitMass = "kg"; unit_c = "J/(kg·K)"; unitDeltaT = "K"; }
        else if (sistema === "Ingles") { unitQ = "BTU"; unitMass = "lb"; unit_c = "BTU/(lb·°F)"; unitDeltaT = "°F"; }
        else if (sistema === "CGS") { unitQ = "erg"; unitMass = "g"; unit_c = "erg/(g·K)"; unitDeltaT = "K"; }
        
        if (Q === "") {
          var m_val = parseFloat(m);
          var c_val = parseFloat(c);
          var dT_val = parseFloat(dT);
          var Q_calc = m_val * c_val * dT_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Calor (Q):</strong></p>
                                 <p>Q = m ⋅ c ⋅ ΔT</p>
                                 <p>Q = ${m_val} ${unitMass} ⋅ ${c_val} ${unit_c} ⋅ ${dT_val} ${unitDeltaT} = ${Q_calc.toFixed(2)} ${unitQ}</p>`;
        } else if (m === "") {
          var Q_val = parseFloat(Q);
          var c_val = parseFloat(c);
          var dT_val = parseFloat(dT);
          if (c_val * dT_val === 0) { resultado.innerHTML = "El producto c ⋅ ΔT no puede ser 0."; return; }
          var m_calc = Q_val / (c_val * dT_val);
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Masa (m):</strong></p>
                                 <p>m = Q / (c ⋅ ΔT)</p>
                                 <p>m = ${Q_val} ${unitQ} / (${c_val}⋅${dT_val}) = ${m_calc.toFixed(2)} ${unitMass}</p>`;
        } else if (c === "") {
          var Q_val = parseFloat(Q);
          var m_val = parseFloat(m);
          var dT_val = parseFloat(dT);
          if (m_val * dT_val === 0) { resultado.innerHTML = "El producto m ⋅ ΔT no puede ser 0."; return; }
          var c_calc = Q_val / (m_val * dT_val);
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Calor Específico (c):</strong></p>
                                 <p>c = Q / (m ⋅ ΔT)</p>
                                 <p>c = ${Q_val} ${unitQ} / (${m_val}⋅${dT_val}) = ${c_calc.toFixed(2)} ${unit_c}</p>`;
        } else if (dT === "") {
          var Q_val = parseFloat(Q);
          var m_val = parseFloat(m);
          var c_val = parseFloat(c);
          if (m_val * c_val === 0) { resultado.innerHTML = "El producto m ⋅ c no puede ser 0."; return; }
          var dT_calc = Q_val / (m_val * c_val);
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo del Cambio de Temperatura (ΔT):</strong></p>
                                 <p>ΔT = Q / (m ⋅ c)</p>
                                 <p>ΔT = ${Q_val} ${unitQ} / (${m_val}⋅${c_val}) = ${dT_calc.toFixed(2)} ${unitDeltaT}</p>`;
        }
      } else if (formula === "PrimeraLey") {
        var dU = document.getElementById("dUTerm").value;
        var Q_PL = document.getElementById("QTermPL").value;
        var W_term = document.getElementById("WTerm").value;
        var countEmpty = 0;
        if (dU === "") countEmpty++;
        if (Q_PL === "") countEmpty++;
        if (W_term === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para la Primera Ley, ingresa exactamente dos valores y deja uno vacío."; return; }
        // Unidades: en MKS se usan J, en Ingles BTU, en CGS erg.
        var unitEnergia;
        if (sistema === "MKS") { unitEnergia = "J"; }
        else if (sistema === "Ingles") { unitEnergia = "BTU"; }
        else if (sistema === "CGS") { unitEnergia = "erg"; }
        
        if (dU === "") {
          var Q_val = parseFloat(Q_PL);
          var W_val = parseFloat(W_term);
          var dU_calc = Q_val - W_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de ΔU:</strong></p>
                                 <p>ΔU = Q − W</p>
                                 <p>ΔU = ${Q_val} − ${W_val} = ${dU_calc.toFixed(2)} ${unitEnergia}</p>`;
        } else if (Q_PL === "") {
          var dU_val = parseFloat(dU);
          var W_val = parseFloat(W_term);
          var Q_calc = dU_val + W_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Q:</strong></p>
                                 <p>Q = ΔU + W</p>
                                 <p>Q = ${dU_val} + ${W_val} = ${Q_calc.toFixed(2)} ${unitEnergia}</p>`;
        } else if (W_term === "") {
          var Q_val = parseFloat(Q_PL);
          var dU_val = parseFloat(dU);
          var W_calc = Q_val - dU_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de W:</strong></p>
                                 <p>W = Q − ΔU</p>
                                 <p>W = ${Q_val} − ${dU_val} = ${W_calc.toFixed(2)} ${unitEnergia}</p>`;
        }
      } else if (formula === "GasesIdeales") {
        var P = document.getElementById("PTerm").value;
        var V = document.getElementById("VTerm").value;
        var n = document.getElementById("nTerm").value;
        var T = document.getElementById("TTerm").value;
        var countEmpty = 0;
        if (P === "") countEmpty++;
        if (V === "") countEmpty++;
        if (n === "") countEmpty++;
        if (T === "") countEmpty++;
        if (countEmpty !== 1) { resultado.innerHTML = "Para la Ley de los Gases Ideales, ingresa exactamente tres valores y deja uno vacío."; return; }
        var unitP, unitV, unit_n, unitT;
        var R;
        if (sistema === "MKS") { unitP = "Pa"; unitV = "m³"; unit_n = "mol"; unitT = "K"; R = 8.314; }
        else if (sistema === "Ingles") { unitP = "psi"; unitV = "ft³"; unit_n = "lbmol"; unitT = "°R"; R = 10.7316; }
        else if (sistema === "CGS") { unitP = "dyn/cm²"; unitV = "cm³"; unit_n = "mol"; unitT = "K"; R = 8.314e7; }
        
        if (P === "") {
          var V_val = parseFloat(V);
          var n_val = parseFloat(n);
          var T_val = parseFloat(T);
          var P_calc = (n_val * R * T_val) / V_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Presión (P):</strong></p>
                                 <p>P ⋅ V = n ⋅ R ⋅ T</p>
                                 <p>P = (n ⋅ R ⋅ T) / V = (${n_val} ⋅ ${R} ⋅ ${T_val}) / ${V_val} = ${P_calc.toFixed(2)} ${unitP}</p>`;
        } else if (V === "") {
          var P_val = parseFloat(P);
          var n_val = parseFloat(n);
          var T_val = parseFloat(T);
          var V_calc = (n_val * R * T_val) / P_val;
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Volumen (V):</strong></p>
                                 <p>V = (n ⋅ R ⋅ T) / P = (${n_val} ⋅ ${R} ⋅ ${T_val}) / ${P_val} = ${V_calc.toFixed(2)} ${unitV}</p>`;
        } else if (n === "") {
          var P_val = parseFloat(P);
          var V_val = parseFloat(V);
          var T_val = parseFloat(T);
          var n_calc = (P_val * V_val) / (R * T_val);
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Cantidad de Sustancia (n):</strong></p>
                                 <p>n = (P ⋅ V) / (R ⋅ T) = (${P_val} ⋅ ${V_val}) / (${R} ⋅ ${T_val}) = ${n_calc.toFixed(2)} ${unit_n}</p>`;
        } else if (T === "") {
          var P_val = parseFloat(P);
          var V_val = parseFloat(V);
          var n_val = parseFloat(n);
          var T_calc = (P_val * V_val) / (n_val * R);
          resultado.innerHTML = `<p><strong>Termodinámica - Cálculo de Temperatura (T):</strong></p>
                                 <p>T = (P ⋅ V) / (n ⋅ R) = (${P_val} ⋅ ${V_val}) / (${n_val} ⋅ ${R}) = ${T_calc.toFixed(2)} ${unitT}</p>`;
        }
      }
    }
  }
  // Correcciones y optimización del código JavaScript para la calculadora de física

// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas(sistema) {
  const etiquetas = {
    MKS: { espacio: "Espacio (d) en metros (m):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en m/s:" },
    Ingles: { espacio: "Espacio (d) en pies (ft):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en ft/s:" },
    CGS: { espacio: "Espacio (d) en centímetros (cm):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en cm/s:" }
  };
  
  document.getElementById("labelEspacio").innerText = etiquetas[sistema].espacio;
  document.getElementById("labelTiempo").innerText = etiquetas[sistema].tiempo;
  document.getElementById("labelVelocidad").innerText = etiquetas[sistema].velocidad;
}

// Función para generar el formulario dinámico según el tipo de cálculo seleccionado
function actualizarFormulario() {
  const tipo = document.getElementById("tipoCalculo").value;
  const formulario = document.getElementById("formulario");
  let html = "";
  
  if (tipo === "MRU") {
    html = generarFormularioMRU();
  } else if (tipo === "MRUA") {
    html = generarFormularioMRUA();
  } else if (tipo === "MRUC") {
    html = generarFormularioMRUC();
  } else if (tipo === "Dinamica") {
    html = generarFormularioDinamica();
  } else if (tipo === "OndasOptica") {
    html = generarFormularioOndasOptica();
  }
  
  formulario.innerHTML = html;
}

// Generar formulario para MRU
function generarFormularioMRU() {
  return `
    <label id="labelEspacio">Espacio (d):</label>
    <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
    
    <label id="labelTiempo">Tiempo (t) en s:</label>
    <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
    
    <label id="labelVelocidad">Velocidad (v):</label>
    <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
  `;
}

// Generar formulario para MRUA
function generarFormularioMRUA() {
  return `
    <label id="labelVi">Velocidad Inicial (v<sub>i</sub>):</label>
    <input type="number" step="any" id="vi" placeholder="Ingresa v<sub>i</sub> o déjalo vacío">
    
    <label id="labelVf">Velocidad Final (v<sub>f</sub>):</label>
    <input type="number" step="any" id="vf" placeholder="Ingresa v<sub>f</sub> o déjalo vacío">
    
    <label id="labelAceleracion">Aceleración (a):</label>
    <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
    
    <label id="labelTiempo">Tiempo (t) en s:</label>
    <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
  `;
}

// Generar formulario para MRUC
function generarFormularioMRUC() {
  return `
    <label id="labelPeriodo">Periodo (T) en s:</label>
    <input type="number" step="any" id="periodo" placeholder="Ingresa T o déjalo vacío">
    
    <label id="labelFrecuencia">Frecuencia (f) en Hz:</label>
    <input type="number" step="any" id="frecuencia" placeholder="Ingresa f o déjalo vacío">
  `;
}

// Generar formulario para Óptica y Ondas
function generarFormularioOndasOptica() {
  return `
    <label id="labelLongitudOnda">Longitud de Onda (λ) en m:</label>
    <input type="number" step="any" id="longitudOnda" placeholder="Ingresa λ o déjalo vacío">
    
    <label id="labelFrecuenciaOnda">Frecuencia (f) en Hz:</label>
    <input type="number" step="any" id="frecuenciaOnda" placeholder="Ingresa f o déjalo vacío">
    
    <label id="labelVelocidadOnda">Velocidad de Onda (v) en m/s:</label>
    <input type="number" step="any" id="velocidadOnda" placeholder="Ingresa v o déjalo vacío">
  `;
}

// Función para calcular valores según el tipo de cálculo
function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultado previo
  
  if (tipo === "MRU") {
    calcularMRU(resultado);
  } else if (tipo === "MRUA") {
    calcularMRUA(resultado);
  } else if (tipo === "MRUC") {
    calcularMRUC(resultado);
  } else if (tipo === "OndasOptica") {
    calcularOndasOptica(resultado);
  }
}

// Función para cálculo de MRU
function calcularMRU(resultado) {
  const espacio = parseFloat(document.getElementById("espacio").value);
  const tiempo = parseFloat(document.getElementById("tiempo").value);
  const velocidad = parseFloat(document.getElementById("velocidad").value);
  
  let countEmpty = 0;
  if (isNaN(espacio)) countEmpty++;
  if (isNaN(tiempo)) countEmpty++;
  if (isNaN(velocidad)) countEmpty++;
  
  if (countEmpty !== 1) {
    resultado.innerHTML = "Por favor, ingresa exactamente dos valores.";
    return;
  }
  
  if (isNaN(espacio)) {
    resultado.innerHTML = `Espacio (d) = Velocidad (v) ⋅ Tiempo (t) = ${velocidad.toFixed(2)} ⋅ ${tiempo.toFixed(2)} = ${(velocidad * tiempo).toFixed(2)} m`;
  } else if (isNaN(tiempo)) {
    resultado.innerHTML = `Tiempo (t) = Espacio (d) / Velocidad (v) = ${espacio.toFixed(2)} / ${velocidad.toFixed(2)} = ${(espacio / velocidad).toFixed(2)} s`;
  } else if (isNaN(velocidad)) {
    resultado.innerHTML = `Velocidad (v) = Espacio (d) / Tiempo (t) = ${espacio.toFixed(2)} / ${tiempo.toFixed(2)} = ${(espacio / tiempo).toFixed(2)} m/s`;
  }
}

// Función para cálculo de Óptica y Ondas
function calcularOndasOptica(resultado) {
  const longitudOnda = parseFloat(document.getElementById("longitudOnda").value);
  const frecuenciaOnda = parseFloat(document.getElementById("frecuenciaOnda").value);
  const velocidadOnda = parseFloat(document.getElementById("velocidadOnda").value);
  
  let countEmpty = 0;
  if (isNaN(longitudOnda)) countEmpty++;
  if (isNaN(frecuenciaOnda)) countEmpty++;
  if (isNaN(velocidadOnda)) countEmpty++;
  
  if (countEmpty !== 1) {
    resultado.innerHTML = "Por favor, ingresa exactamente dos valores.";
    return;
  }
  
  if (isNaN(longitudOnda)) {
    resultado.innerHTML = `Longitud de Onda (λ) = Velocidad (v) / Frecuencia (f) = ${velocidadOnda.toFixed(2)} / ${frecuenciaOnda.toFixed(2)} = ${(velocidadOnda / frecuenciaOnda).toFixed(2)} m`;
  } else if (isNaN(frecuenciaOnda)) {
    resultado.innerHTML = `Frecuencia (f) = Velocidad (v) / Longitud de Onda (λ) = ${velocidadOnda.toFixed(2)} / ${longitudOnda.toFixed(2)} = ${(velocidadOnda / longitudOnda).toFixed(2)} Hz`;
  } else if (isNaN(velocidadOnda)) {
    resultado.innerHTML = `Velocidad de Onda (v) = Longitud de Onda (λ) ⋅ Frecuencia (f) = ${longitudOnda.toFixed(2)} ⋅ ${frecuenciaOnda.toFixed(2)} = ${(longitudOnda * frecuenciaOnda).toFixed(2)} m/s`;
  }
}
// Correcciones y optimización del código JavaScript para la calculadora de física con nuevas funciones para Óptica y Ondas

// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas(sistema) {
  const etiquetas = {
    MKS: { espacio: "Espacio (d) en metros (m):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en m/s:" },
    Ingles: { espacio: "Espacio (d) en pies (ft):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en ft/s:" },
    CGS: { espacio: "Espacio (d) en centímetros (cm):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en cm/s:" }
  };
  document.getElementById("labelEspacio").innerText = etiquetas[sistema].espacio;
  document.getElementById("labelTiempo").innerText = etiquetas[sistema].tiempo;
  document.getElementById("labelVelocidad").innerText = etiquetas[sistema].velocidad;
}

// Función para generar el formulario dinámico según el tipo de cálculo seleccionado
function actualizarFormulario() {
  const tipo = document.getElementById("tipoCalculo").value;
  const formulario = document.getElementById("formulario");
  let html = "";
  switch (tipo) {
    case "MRU":
      html = generarFormularioMRU();
      break;
    case "MRUA":
      html = generarFormularioMRUA();
      break;
    case "MRUC":
      html = generarFormularioMRUC();
      break;
    case "Dinamica":
      html = generarFormularioDinamica();
      break;
    case "OndasOptica":
      html = generarFormularioOndasOptica();
      break;
  }
  formulario.innerHTML = html;
}

// Generar formulario para MRU
function generarFormularioMRU() {
  return `
    <label>Espacio (d):</label>
    <input type="number" step="any" id="espacio" placeholder="Ingresa d o déjalo vacío">
    <label>Tiempo (t) en s:</label>
    <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
    <label>Velocidad (v):</label>
    <input type="number" step="any" id="velocidad" placeholder="Ingresa v o déjalo vacío">
  `;
}

// Generar formulario para MRUA
function generarFormularioMRUA() {
  return `
    <label>Velocidad Inicial (v<sub>i</sub>):</label>
    <input type="number" step="any" id="vi" placeholder="Ingresa v<sub>i</sub> o déjalo vacío">
    <label>Velocidad Final (v<sub>f</sub>):</label>
    <input type="number" step="any" id="vf" placeholder="Ingresa v<sub>f</sub> o déjalo vacío">
    <label>Aceleración (a):</label>
    <input type="number" step="any" id="aceleracion" placeholder="Ingresa a o déjalo vacío">
    <label>Tiempo (t) en s:</label>
    <input type="number" step="any" id="tiempo" placeholder="Ingresa t o déjalo vacío">
  `;
}

// Generar formulario para MRUC
function generarFormularioMRUC() {
  return `
    <label>Periodo (T) en s:</label>
    <input type="number" step="any" id="periodo" placeholder="Ingresa T o déjalo vacío">
    <label>Frecuencia (f) en Hz:</label>
    <input type="number" step="any" id="frecuencia" placeholder="Ingresa f o déjalo vacío">
  `;
}

// Generar formulario para Óptica y Ondas
function generarFormularioOndasOptica() {
  return `
    <label>Longitud de Onda (λ) en m:</label>
    <input type="number" step="any" id="longitudOnda" placeholder="Ingresa λ o déjalo vacío">
    <label>Frecuencia (f) en Hz:</label>
    <input type="number" step="any" id="frecuenciaOnda" placeholder="Ingresa f o déjalo vacío">
    <label>Velocidad de Onda (v) en m/s:</label>
    <input type="number" step="any" id="velocidadOnda" placeholder="Ingresa v o déjalo vacío">
    <label>Ángulo de incidencia (θ<sub>1</sub>) en grados:</label>
    <input type="number" step="any" id="anguloIncidencia" placeholder="Ingresa θ<sub>1</sub>">
    <label>Índice de refracción 1 (n<sub>1</sub>):</label>
    <input type="number" step="any" id="indice1" placeholder="Ingresa n<sub>1</sub>">
    <label>Índice de refracción 2 (n<sub>2</sub>):</label>
    <input type="number" step="any" id="indice2" placeholder="Ingresa n<sub>2</sub>">
  `;
}

// Función para calcular valores según el tipo de cálculo
function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultado previo
  switch (tipo) {
    case "MRU":
      calcularMRU(resultado);
      break;
    case "MRUA":
      calcularMRUA(resultado);
      break;
    case "MRUC":
      calcularMRUC(resultado);
      break;
    case "OndasOptica":
      calcularOndasOptica(resultado);
      break;
  }
}

// Función para cálculo de MRU
function calcularMRU(resultado) {
  const espacio = parseFloat(document.getElementById("espacio").value);
  const tiempo = parseFloat(document.getElementById("tiempo").value);
  const velocidad = parseFloat(document.getElementById("velocidad").value);
  let countEmpty = 0;
  if (isNaN(espacio)) countEmpty++;
  if (isNaN(tiempo)) countEmpty++;
  if (isNaN(velocidad)) countEmpty++;
  if (countEmpty !== 1) {
    resultado.innerHTML = "Por favor, ingresa exactamente dos valores.";
    return;
  }
  if (isNaN(espacio)) {
    resultado.innerHTML = `Espacio (d) = Velocidad (v) ⋅ Tiempo (t) = ${(velocidad * tiempo).toFixed(2)} m`;
  } else if (isNaN(tiempo)) {
    resultado.innerHTML = `Tiempo (t) = Espacio (d) / Velocidad (v) = ${(espacio / velocidad).toFixed(2)} s`;
  } else {
    resultado.innerHTML = `Velocidad (v) = Espacio (d) / Tiempo (t) = ${(espacio / tiempo).toFixed(2)} m/s`;
  }
}

// Función para cálculo de Óptica y Ondas
function calcularOndasOptica(resultado) {
  const longitudOnda = parseFloat(document.getElementById("longitudOnda").value);
  const frecuenciaOnda = parseFloat(document.getElementById("frecuenciaOnda").value);
  const velocidadOnda = parseFloat(document.getElementById("velocidadOnda").value);
  const anguloIncidencia = parseFloat(document.getElementById("anguloIncidencia").value);
  const indice1 = parseFloat(document.getElementById("indice1").value);
  const indice2 = parseFloat(document.getElementById("indice2").value);
  let countEmpty = 0;
  if (isNaN(longitudOnda)) countEmpty++;
  if (isNaN(frecuenciaOnda)) countEmpty++;
  if (isNaN(velocidadOnda)) countEmpty++;
  if (countEmpty !== 1) {
    resultado.innerHTML = "Por favor, ingresa exactamente dos valores para cálculo básico.";
    return;
  }
  if (isNaN(longitudOnda)) {
    resultado.innerHTML = `Longitud de Onda (λ) = Velocidad (v) / Frecuencia (f) = ${(velocidadOnda / frecuenciaOnda).toFixed(2)} m`;
  } else if (isNaN(frecuenciaOnda)) {
    resultado.innerHTML = `Frecuencia (f) = Velocidad (v) / Longitud de Onda (λ) = ${(velocidadOnda / longitudOnda).toFixed(2)} Hz`;
  } else {
    resultado.innerHTML = `Velocidad de Onda (v) = Longitud de Onda (λ) ⋅ Frecuencia (f) = ${(longitudOnda * frecuenciaOnda).toFixed(2)} m/s`;
  }
  if (!isNaN(anguloIncidencia) && !isNaN(indice1) && !isNaN(indice2)) {
    const anguloRefraccion = Math.asin((indice1 / indice2) * Math.sin(anguloIncidencia * (Math.PI / 180))) * (180 / Math.PI);
    resultado.innerHTML += `<br>Ángulo de Refracción (θ<sub>2</sub>) = ${anguloRefraccion.toFixed(2)}°`;
  }
}
// Correcciones y optimización del código JavaScript para la calculadora de física con funciones para Dinámica y Óptica y Ondas avanzadas

// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas(sistema) {
  const etiquetas = {
    MKS: { espacio: "Espacio (d) en metros (m):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en m/s:" },
    Ingles: { espacio: "Espacio (d) en pies (ft):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en ft/s:" },
    CGS: { espacio: "Espacio (d) en centímetros (cm):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en cm/s:" }
  };
  document.getElementById("labelEspacio").innerText = etiquetas[sistema].espacio;
  document.getElementById("labelTiempo").innerText = etiquetas[sistema].tiempo;
  document.getElementById("labelVelocidad").innerText = etiquetas[sistema].velocidad;
}

// Función para generar el formulario dinámico según el tipo de cálculo seleccionado
function actualizarFormulario() {
  const tipo = document.getElementById("tipoCalculo").value;
  const formulario = document.getElementById("formulario");
  let html = "";
  switch (tipo) {
    case "MRU":
      html = generarFormularioMRU();
      break;
    case "MRUA":
      html = generarFormularioMRUA();
      break;
    case "MRUC":
      html = generarFormularioMRUC();
      break;
    case "Dinamica":
      html = generarFormularioDinamica();
      break;
    case "OndasOptica":
      html = generarFormularioOndasOptica();
      break;
  }
  formulario.innerHTML = html;
}

// Generar formulario para Dinámica
function generarFormularioDinamica() {
  return `
    <p>Selecciona el tipo de cálculo:</p>
    <select id="tipoDinamica" onchange="actualizarFormularioDinamica()">
      <option value="Fuerza">Fuerza (F = m ⋅ a)</option>
      <option value="Peso">Peso (W = m ⋅ g)</option>
      <option value="Rozamiento">Fuerza de Rozamiento (f = μ ⋅ N)</option>
      <option value="Trabajo">Trabajo (W = F ⋅ d ⋅ cos(θ))</option>
    </select>
    <div id="formularioDinamica"></div>
  `;
}

function actualizarFormularioDinamica() {
  const tipoDinamica = document.getElementById("tipoDinamica").value;
  const formularioDinamica = document.getElementById("formularioDinamica");
  let html = "";
  switch (tipoDinamica) {
    case "Fuerza":
      html = `
        <label>Masa (m) en kg:</label>
        <input type="number" step="any" id="masa" placeholder="Ingresa m">
        <label>Aceleración (a) en m/s²:</label>
        <input type="number" step="any" id="aceleracion" placeholder="Ingresa a">
      `;
      break;
    case "Peso":
      html = `
        <label>Masa (m) en kg:</label>
        <input type="number" step="any" id="masaPeso" placeholder="Ingresa m">
        <label>Gravedad (g) en m/s² (por defecto 9.8):</label>
        <input type="number" step="any" id="gravedad" value="9.8">
      `;
      break;
    case "Rozamiento":
      html = `
        <label>Coeficiente de Rozamiento (μ):</label>
        <input type="number" step="any" id="coeficienteRozamiento" placeholder="Ingresa μ">
        <label>Normal (N) en N:</label>
        <input type="number" step="any" id="normal" placeholder="Ingresa N">
      `;
      break;
    case "Trabajo":
      html = `
        <label>Fuerza (F) en N:</label>
        <input type="number" step="any" id="fuerza" placeholder="Ingresa F">
        <label>Distancia (d) en m:</label>
        <input type="number" step="any" id="distancia" placeholder="Ingresa d">
        <label>Ángulo (θ) en grados:</label>
        <input type="number" step="any" id="angulo" placeholder="Ingresa θ">
      `;
      break;
  }
  formularioDinamica.innerHTML = html;
}

// Función para calcular valores según el tipo de cálculo
function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultado previo
  switch (tipo) {
    case "MRU":
      calcularMRU(resultado);
      break;
    case "MRUA":
      calcularMRUA(resultado);
      break;
    case "MRUC":
      calcularMRUC(resultado);
      break;
    case "Dinamica":
      calcularDinamica(resultado);
      break;
    case "OndasOptica":
      calcularOndasOptica(resultado);
      break;
  }
}

// Función para cálculo de Dinámica
function calcularDinamica(resultado) {
  const tipoDinamica = document.getElementById("tipoDinamica").value;
  switch (tipoDinamica) {
    case "Fuerza":
      const masa = parseFloat(document.getElementById("masa").value);
      const aceleracion = parseFloat(document.getElementById("aceleracion").value);
      if (!isNaN(masa) && !isNaN(aceleracion)) {
        resultado.innerHTML = `Fuerza (F) = m ⋅ a = ${(masa * aceleracion).toFixed(2)} N`;
      }
      break;
    case "Peso":
      const masaPeso = parseFloat(document.getElementById("masaPeso").value);
      const gravedad = parseFloat(document.getElementById("gravedad").value);
      if (!isNaN(masaPeso) && !isNaN(gravedad)) {
        resultado.innerHTML = `Peso (W) = m ⋅ g = ${(masaPeso * gravedad).toFixed(2)} N`;
      }
      break;
    case "Rozamiento":
      const coeficienteRozamiento = parseFloat(document.getElementById("coeficienteRozamiento").value);
      const normal = parseFloat(document.getElementById("normal").value);
      if (!isNaN(coeficienteRozamiento) && !isNaN(normal)) {
        resultado.innerHTML = `Fuerza de Rozamiento (f) = μ ⋅ N = ${(coeficienteRozamiento * normal).toFixed(2)} N`;
      }
      break;
    case "Trabajo":
      const fuerza = parseFloat(document.getElementById("fuerza").value);
      const distancia = parseFloat(document.getElementById("distancia").value);
      const angulo = parseFloat(document.getElementById("angulo").value);
      if (!isNaN(fuerza) && !isNaN(distancia) && !isNaN(angulo)) {
        const trabajo = fuerza * distancia * Math.cos(angulo * (Math.PI / 180));
        resultado.innerHTML = `Trabajo (W) = F ⋅ d ⋅ cos(θ) = ${trabajo.toFixed(2)} J`;
      }
      break;
  }
}
// Correcciones y optimización del código JavaScript para la calculadora de física con funciones para Dinámica, Termodinámica y Óptica y Ondas avanzadas

// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas(sistema) {
  const etiquetas = {
    MKS: { espacio: "Espacio (d) en metros (m):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en m/s:" },
    Ingles: { espacio: "Espacio (d) en pies (ft):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en ft/s:" },
    CGS: { espacio: "Espacio (d) en centímetros (cm):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en cm/s:" }
  };
  document.getElementById("labelEspacio").innerText = etiquetas[sistema].espacio;
  document.getElementById("labelTiempo").innerText = etiquetas[sistema].tiempo;
  document.getElementById("labelVelocidad").innerText = etiquetas[sistema].velocidad;
}

// Función para generar el formulario dinámico según el tipo de cálculo seleccionado
function actualizarFormulario() {
  const tipo = document.getElementById("tipoCalculo").value;
  const formulario = document.getElementById("formulario");
  let html = "";
  switch (tipo) {
    case "MRU":
      html = generarFormularioMRU();
      break;
    case "MRUA":
      html = generarFormularioMRUA();
      break;
    case "MRUC":
      html = generarFormularioMRUC();
      break;
    case "Dinamica":
      html = generarFormularioDinamica();
      break;
    case "Termodinamica":
      html = generarFormularioTermodinamica();
      break;
    case "OndasOptica":
      html = generarFormularioOndasOptica();
      break;
  }
  formulario.innerHTML = html;
}

// Generar formulario para Termodinámica
function generarFormularioTermodinamica() {
  return `
    <p>Selecciona el tipo de cálculo:</p>
    <select id="tipoTermodinamica" onchange="actualizarFormularioTermodinamica()">
      <option value="PrimeraLey">Primera Ley de la Termodinámica (ΔU = Q - W)</option>
      <option value="CalorSensible">Calor Sensible (Q = m ⋅ c ⋅ ΔT)</option>
      <option value="Eficiencia">Eficiencia de Máquina Térmica (η = W / Q<sub>in</sub>)</option>
    </select>
    <div id="formularioTermodinamica"></div>
  `;
}

function actualizarFormularioTermodinamica() {
  const tipoTermodinamica = document.getElementById("tipoTermodinamica").value;
  const formularioTermodinamica = document.getElementById("formularioTermodinamica");
  let html = "";
  switch (tipoTermodinamica) {
    case "PrimeraLey":
      html = `
        <label>Calor (Q) en J:</label>
        <input type="number" step="any" id="calor" placeholder="Ingresa Q">
        <label>Trabajo (W) en J:</label>
        <input type="number" step="any" id="trabajo" placeholder="Ingresa W">
      `;
      break;
    case "CalorSensible":
      html = `
        <label>Masa (m) en kg:</label>
        <input type="number" step="any" id="masaCalor" placeholder="Ingresa m">
        <label>Calor específico (c) en J/kg°C:</label>
        <input type="number" step="any" id="calorEspecifico" placeholder="Ingresa c">
        <label>Diferencia de temperatura (ΔT) en °C:</label>
        <input type="number" step="any" id="deltaT" placeholder="Ingresa ΔT">
      `;
      break;
    case "Eficiencia":
      html = `
        <label>Trabajo realizado (W) en J:</label>
        <input type="number" step="any" id="trabajoEficiencia" placeholder="Ingresa W">
        <label>Calor absorbido (Q<sub>in</sub>) en J:</label>
        <input type="number" step="any" id="calorEntrada" placeholder="Ingresa Q<sub>in</sub>">
      `;
      break;
  }
  formularioTermodinamica.innerHTML = html;
}

// Función para calcular valores según el tipo de cálculo
function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultado previo
  switch (tipo) {
    case "MRU":
      calcularMRU(resultado);
      break;
    case "MRUA":
      calcularMRUA(resultado);
      break;
    case "MRUC":
      calcularMRUC(resultado);
      break;
    case "Dinamica":
      calcularDinamica(resultado);
      break;
    case "Termodinamica":
      calcularTermodinamica(resultado);
      break;
    case "OndasOptica":
      calcularOndasOptica(resultado);
      break;
  }
}

// Función para cálculo de Termodinámica
function calcularTermodinamica(resultado) {
  const tipoTermodinamica = document.getElementById("tipoTermodinamica").value;
  switch (tipoTermodinamica) {
    case "PrimeraLey":
      const calor = parseFloat(document.getElementById("calor").value);
      const trabajo = parseFloat(document.getElementById("trabajo").value);
      if (!isNaN(calor) && !isNaN(trabajo)) {
        resultado.innerHTML = `Cambio en la energía interna (ΔU) = Q - W = ${(calor - trabajo).toFixed(2)} J`;
      }
      break;
    case "CalorSensible":
      const masaCalor = parseFloat(document.getElementById("masaCalor").value);
      const calorEspecifico = parseFloat(document.getElementById("calorEspecifico").value);
      const deltaT = parseFloat(document.getElementById("deltaT").value);
      if (!isNaN(masaCalor) && !isNaN(calorEspecifico) && !isNaN(deltaT)) {
        const calorSensible = masaCalor * calorEspecifico * deltaT;
        resultado.innerHTML = `Calor Sensible (Q) = m ⋅ c ⋅ ΔT = ${calorSensible.toFixed(2)} J`;
      }
      break;
    case "Eficiencia":
      const trabajoEficiencia = parseFloat(document.getElementById("trabajoEficiencia").value);
      const calorEntrada = parseFloat(document.getElementById("calorEntrada").value);
      if (!isNaN(trabajoEficiencia) && !isNaN(calorEntrada) && calorEntrada !== 0) {
        const eficiencia = (trabajoEficiencia / calorEntrada) * 100;
        resultado.innerHTML = `Eficiencia (η) = ${(eficiencia).toFixed(2)}%`;
      }
      break;
  }
}
// Correcciones y optimización del código JavaScript para la calculadora de física con funciones para Dinámica, Termodinámica, Hidráulica y Óptica y Ondas avanzadas

// Función para actualizar las etiquetas y placeholders según el sistema seleccionado
function actualizarEtiquetas(sistema) {
  const etiquetas = {
    MKS: { espacio: "Espacio (d) en metros (m):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en m/s:" },
    Ingles: { espacio: "Espacio (d) en pies (ft):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en ft/s:" },
    CGS: { espacio: "Espacio (d) en centímetros (cm):", tiempo: "Tiempo (t) en segundos (s):", velocidad: "Velocidad (v) en cm/s:" }
  };
  document.getElementById("labelEspacio").innerText = etiquetas[sistema].espacio;
  document.getElementById("labelTiempo").innerText = etiquetas[sistema].tiempo;
  document.getElementById("labelVelocidad").innerText = etiquetas[sistema].velocidad;
}

// Función para generar el formulario dinámico según el tipo de cálculo seleccionado
function actualizarFormulario() {
  const tipo = document.getElementById("tipoCalculo").value;
  const formulario = document.getElementById("formulario");
  let html = "";
  switch (tipo) {
    case "MRU":
      html = generarFormularioMRU();
      break;
    case "MRUA":
      html = generarFormularioMRUA();
      break;
    case "MRUC":
      html = generarFormularioMRUC();
      break;
    case "Dinamica":
      html = generarFormularioDinamica();
      break;
    case "Termodinamica":
      html = generarFormularioTermodinamica();
      break;
    case "Hidraulica":
      html = generarFormularioHidraulica();
      break;
    case "OndasOptica":
      html = generarFormularioOndasOptica();
      break;
  }
  formulario.innerHTML = html;
}

// Generar formulario para Hidráulica
function generarFormularioHidraulica() {
  return `
    <p>Selecciona el tipo de cálculo:</p>
    <select id="tipoHidraulica" onchange="actualizarFormularioHidraulica()">
      <option value="Presion">Presión (P = F / A)</option>
      <option value="Pascal">Principio de Pascal (F<sub>2</sub> = F<sub>1</sub> ⋅ A<sub>2</sub> / A<sub>1</sub>)</option>
      <option value="GastoVolumetrico">Gasto Volumétrico (Q = A ⋅ v)</option>
    </select>
    <div id="formularioHidraulica"></div>
  `;
}

function actualizarFormularioHidraulica() {
  const tipoHidraulica = document.getElementById("tipoHidraulica").value;
  const formularioHidraulica = document.getElementById("formularioHidraulica");
  let html = "";
  switch (tipoHidraulica) {
    case "Presion":
      html = `
        <label>Fuerza (F) en N:</label>
        <input type="number" step="any" id="fuerzaPresion" placeholder="Ingresa F">
        <label>Área (A) en m²:</label>
        <input type="number" step="any" id="areaPresion" placeholder="Ingresa A">
      `;
      break;
    case "Pascal":
      html = `
        <label>Fuerza 1 (F<sub>1</sub>) en N:</label>
        <input type="number" step="any" id="fuerza1" placeholder="Ingresa F<sub>1</sub>">
        <label>Área 1 (A<sub>1</sub>) en m²:</label>
        <input type="number" step="any" id="area1" placeholder="Ingresa A<sub>1</sub>">
        <label>Área 2 (A<sub>2</sub>) en m²:</label>
        <input type="number" step="any" id="area2" placeholder="Ingresa A<sub>2</sub>">
      `;
      break;
    case "GastoVolumetrico":
      html = `
        <label>Área (A) en m²:</label>
        <input type="number" step="any" id="areaGasto" placeholder="Ingresa A">
        <label>Velocidad (v) en m/s:</label>
        <input type="number" step="any" id="velocidadGasto" placeholder="Ingresa v">
      `;
      break;
  }
  formularioHidraulica.innerHTML = html;
}

// Función para calcular valores según el tipo de cálculo
function calcular() {
  const tipo = document.getElementById("tipoCalculo").value;
  const resultado = document.getElementById("resultado");
  resultado.innerHTML = ""; // Limpiar resultado previo
  switch (tipo) {
    case "MRU":
      calcularMRU(resultado);
      break;
    case "MRUA":
      calcularMRUA(resultado);
      break;
    case "MRUC":
      calcularMRUC(resultado);
      break;
    case "Dinamica":
      calcularDinamica(resultado);
      break;
    case "Termodinamica":
      calcularTermodinamica(resultado);
      break;
    case "Hidraulica":
      calcularHidraulica(resultado);
      break;
    case "OndasOptica":
      calcularOndasOptica(resultado);
      break;
  }
}

// Función para cálculo de Hidráulica
function calcularHidraulica(resultado) {
  const tipoHidraulica = document.getElementById("tipoHidraulica").value;
  switch (tipoHidraulica) {
    case "Presion":
      const fuerzaPresion = parseFloat(document.getElementById("fuerzaPresion").value);
      const areaPresion = parseFloat(document.getElementById("areaPresion").value);
      if (!isNaN(fuerzaPresion) && !isNaN(areaPresion) && areaPresion !== 0) {
        const presion = fuerzaPresion / areaPresion;
        resultado.innerHTML = `Presión (P) = F / A = ${presion.toFixed(2)} Pa`;
      }
      break;
    case "Pascal":
      const fuerza1 = parseFloat(document.getElementById("fuerza1").value);
      const area1 = parseFloat(document.getElementById("area1").value);
      const area2 = parseFloat(document.getElementById("area2").value);
      if (!isNaN(fuerza1) && !isNaN(area1) && !isNaN(area2) && area1 !== 0) {
        const fuerza2 = (fuerza1 * area2) / area1;
        resultado.innerHTML = `Fuerza 2 (F<sub>2</sub>) = F<sub>1</sub> ⋅ A<sub>2</sub> / A<sub>1</sub> = ${fuerza2.toFixed(2)} N`;
      }
      break;
    case "GastoVolumetrico":
      const areaGasto = parseFloat(document.getElementById("areaGasto").value);
      const velocidadGasto = parseFloat(document.getElementById("velocidadGasto").value);
      if (!isNaN(areaGasto) && !isNaN(velocidadGasto)) {
        const gastoVolumetrico = areaGasto * velocidadGasto;
        resultado.innerHTML = `Gasto Volumétrico (Q) = A ⋅ v = ${gastoVolumetrico.toFixed(2)} m³/s`;
      }
      break;
  }
}
