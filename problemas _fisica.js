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
 