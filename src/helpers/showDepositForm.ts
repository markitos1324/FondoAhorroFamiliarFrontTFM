
import Swal from 'sweetalert2';

export function showTransactionInPlanForm(onSubmit: (data: any) => void, planAhorroId: number, planName: string, type: 'INGRESO' | 'GASTO' = 'INGRESO') {
  const isDeposit = type === 'INGRESO';
  Swal.fire({
    title: `<div style='display:flex;flex-direction:column;align-items:center;'>
      <span style="color:${isDeposit ? '#16a34a' : '#dc2626'};font-weight:600;">Deposita en el plan</span>
      <span style="color:#2563eb;font-weight:600;">${planName}</span>
    </div>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input id="swal-desc" class="swal2-input" placeholder="Descripción" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
        <input id="swal-amount" type="number" class="swal2-input" placeholder="Monto" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
        <input id="swal-date" type="date" class="swal2-input" placeholder="Fecha" style="border-radius:0.5rem;border:1px solid #d1d5db;" value="${new Date().toISOString().slice(0, 10)}" />
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;padding-left:3rem;">
          <input id="swal-recurrente" type="checkbox" style="border-radius:0.5rem;border:1px solid #d1d5db;width:22px;height:22px;accent-color:${isDeposit ? '#2563eb' : '#dc2626'};box-shadow:0 0 0 2px ${isDeposit ? '#2563eb22' : '#dc262622'};" onchange="document.getElementById('swal-frecuencia-container').style.display = this.checked ? 'flex' : 'none'; if(this.checked){document.getElementById('swal-frecuencia').value='DIARIA';}" />
          <label for="swal-recurrente" style="font-size:15px;text-align:left;">Recurrente</label>
        </div>
        <div id="swal-frecuencia-container" style="display:none;align-items:center;gap:10px;margin-bottom:0.5rem;padding-left:3rem;">
          <label for="swal-frecuencia" style="font-size:15px;text-align:left;">Frecuencia</label>
          <select id="swal-frecuencia" class="swal2-input" style="border-radius:0.5rem;border:1px solid #d1d5db;min-width:90px;">
            <option value="DIARIA" selected>Diaria</option>
            <option value="SEMANAL">Semanal</option>
            <option value="MENSUAL">Mensual</option>
          </select>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `<span style="background-color:${isDeposit ? '#16a34a' : '#dc2626'};color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">${isDeposit ? 'Depositar' : 'Retirar'}</span>`,
    cancelButtonText: '<span style="background-color:#6b7280;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Cancelar</span>',
    customClass: {
      confirmButton: 'swal2-confirm custom-deposit-btn',
      cancelButton: 'swal2-cancel custom-cancel-btn',
      popup: 'swal2-rounded',
      actions: 'swal2-actions-separated',
    },
    buttonsStyling: false,
    preConfirm: () => {
      const descripcion = (document.getElementById('swal-desc') as HTMLInputElement).value;
      const monto = parseFloat((document.getElementById('swal-amount') as HTMLInputElement).value);
      const fecha = (document.getElementById('swal-date') as HTMLInputElement).value;
      const recurrente = (document.getElementById('swal-recurrente') as HTMLInputElement).checked;
      let frecuencia = "DIARIA";
      if (recurrente) {
        frecuencia = (document.getElementById('swal-frecuencia') as HTMLSelectElement).value;
      }
      if (!descripcion || isNaN(monto) || !fecha) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return;
      }
      return {
        descripcion,
        tipo: type,
        monto,
        fecha,
        recurrente,
        frecuencia: recurrente ? frecuencia : "DIARIA",
        planAhorroId
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
    }
  });
}

export function showPlanForm(onSubmit: (data: any) => void) {
  Swal.fire({
    title: `<span style="color:#2563eb;font-weight:600;">Nuevo Plan de Ahorro</span>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input id="swal-nombre" class="swal2-input" placeholder="Nombre del plan" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
        <input id="swal-meta" type="number" class="swal2-input" placeholder="Meta (ej: 300000)" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `<span style="background-color:#2563eb;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Crear Plan</span>`,
    cancelButtonText: '<span style="background-color:#6b7280;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Cancelar</span>',
    customClass: {
      confirmButton: 'swal2-confirm custom-deposit-btn',
      cancelButton: 'swal2-cancel custom-cancel-btn',
      popup: 'swal2-rounded',
      actions: 'swal2-actions-separated',
    },
    buttonsStyling: false,
    preConfirm: () => {
      const nombre = (document.getElementById('swal-nombre') as HTMLInputElement).value;
      const meta = parseFloat((document.getElementById('swal-meta') as HTMLInputElement).value);
      if (!nombre || isNaN(meta)) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return;
      }
      return {
        nombre,
        meta
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
    }
  });
}

export function showTransactionForm(onSubmit: (data: any) => void, type: 'INGRESO' | 'GASTO' = 'INGRESO') {
  const isDeposit = type === 'INGRESO';
  Swal.fire({
    title: `<span style="color:${isDeposit ? '#16a34a' : '#dc2626'};font-weight:600;">Nuevo ${isDeposit ? 'Depósito' : 'Gasto'}</span>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:12px;">
        <input id="swal-desc" class="swal2-input" placeholder="Descripción" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
        <input id="swal-amount" type="number" class="swal2-input" placeholder="Monto" style="border-radius:0.5rem;border:1px solid #d1d5db;" />
        <input id="swal-date" type="date" class="swal2-input" placeholder="Fecha" style="border-radius:0.5rem;border:1px solid #d1d5db;" value="${new Date().toISOString().slice(0, 10)}" disabled />
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;padding-left:3rem;">
          <input id="swal-recurrente" type="checkbox" style="border-radius:0.5rem;border:1px solid #d1d5db;width:22px;height:22px;accent-color:${isDeposit ? '#2563eb' : '#dc2626'};box-shadow:0 0 0 2px ${isDeposit ? '#2563eb22' : '#dc262622'};" />
          <label for="swal-recurrente" style="font-size:15px;text-align:left;">Recurrente</label>
        </div>
        <div style="display:flex;align-items:center;gap:10px;margin-bottom:0.5rem;padding-left:3rem;">
          <label for="swal-frecuencia" style="font-size:15px;text-align:left;">Frecuencia</label>
          <select id="swal-frecuencia" class="swal2-input" style="border-radius:0.5rem;border:1px solid #d1d5db;min-width:90px;">
            <option value="DIARIA">Diaria</option>
            <option value="SEMANAL">Semanal</option>
            <option value="MENSUAL">Mensual</option>
          </select>
        </div>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `<span style="background-color:${isDeposit ? '#16a34a' : '#dc2626'};color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">${isDeposit ? 'Depositar' : 'Retirar'}</span>`,
    cancelButtonText: '<span style="background-color:#6b7280;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Cancelar</span>',
    customClass: {
      confirmButton: 'swal2-confirm custom-deposit-btn',
      cancelButton: 'swal2-cancel custom-cancel-btn',
      popup: 'swal2-rounded',
      actions: 'swal2-actions-separated',
    },
    buttonsStyling: false,
    preConfirm: () => {
      const descripcion = (document.getElementById('swal-desc') as HTMLInputElement).value;
      const monto = parseFloat((document.getElementById('swal-amount') as HTMLInputElement).value);
      // Fecha del día en formato YYYY-MM-DD
      const fecha = new Date().toISOString().slice(0, 10);
      const recurrente = (document.getElementById('swal-recurrente') as HTMLInputElement).checked;
      const frecuencia = (document.getElementById('swal-frecuencia') as HTMLSelectElement).value;
      if (!descripcion || isNaN(monto) || !fecha) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return;
      }
      return {
        descripcion,
        tipo: type,
        monto,
        fecha,
        recurrente,
        frecuencia
      };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
    }
  });
}

export function showAddMember(onSubmit: (data: any) => void) {
  Swal.fire({
    title: `<span style="color:#2563eb;font-weight:600;">Agregar Usuario</span>`,
    html: `
      <div style="display:flex;flex-direction:column;gap:16px;align-items:stretch;width:100%;">
        <input 
          id="swal-email" 
          type="email" 
          class="swal2-input" 
          placeholder="Correo electrónico (ej: usuario1@ahorro.com.co)" 
          style="width:100%;margin:0;border-radius:0.5rem;border:1px solid #d1d5db;" 
        />
        <select 
          id="swal-rol" 
          class="swal2-input" 
          style="width:100%;margin:0;border-radius:0.5rem;border:1px solid #d1d5db;"
        >
          <option value="">Seleccione un rol</option>
          <option value="ADMIN">ADMIN</option>
          <option value="COLABORADOR">COLABORADOR</option>
        </select>
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: `<span style="background-color:#2563eb;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Agregar</span>`,
    cancelButtonText: '<span style="background-color:#6b7280;color:white;padding:6px 24px;border-radius:0.375rem;font-weight:500;">Cancelar</span>',
    customClass: {
      confirmButton: 'swal2-confirm custom-deposit-btn',
      cancelButton: 'swal2-cancel custom-cancel-btn',
      popup: 'swal2-rounded',
      actions: 'swal2-actions-separated',
    },
    buttonsStyling: false,
    preConfirm: () => {
      const email = (document.getElementById('swal-email') as HTMLInputElement).value.trim();
      const rol = (document.getElementById('swal-rol') as HTMLSelectElement).value;

      // Regex simple para validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!email || !rol) {
        Swal.showValidationMessage('Todos los campos son obligatorios');
        return;
      }

      if (!emailRegex.test(email)) {
        Swal.showValidationMessage('Ingrese un correo electrónico válido');
        return;
      }

      return { email, rol };
    }
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      onSubmit(result.value);
    }
  });
}

