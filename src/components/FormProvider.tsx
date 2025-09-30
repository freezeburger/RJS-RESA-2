import React, { createContext, useContext, useReducer } from 'react';


/**
 * Etat d'un champ statut de validation
 * Et message d'erreur
 */
type FieldState = {
  value: string;
  status: 'idle' | 'validating' | 'valid' | 'error';
  error?: string;
};
type FormState = Record<string, FieldState>;

type Action =
  | { type: 'CHANGE'; name: string; value: string }
  | { type: 'VALIDATING'; name: string }
  | { type: 'VALID'; name: string }
  | { type: 'ERROR'; name: string; message: string };

function reducer(state: FormState, action: Action): FormState {
  switch (action.type) {
    case 'CHANGE':
      return {
        ...state,
        [action.name]: { value: action.value, status: 'idle', error: undefined },
      };
    case 'VALIDATING':
      return {
        ...state,
        [action.name]: { ...state[action.name], status: 'validating', error: undefined },
      };
    case 'VALID':
      return {
        ...state,
        [action.name]: { ...state[action.name], status: 'valid', error: undefined },
      };
    case 'ERROR':
      return {
        ...state,
        [action.name]: { ...state[action.name], status: 'error', error: action.message },
      };
    default:
      return state;
  }
}

const FormCtx = createContext<{
  state: FormState;
  change: (name: string, value: string) => void;
  validateField: (name: string, validator: (v: string) => Promise<void>) => Promise<void>;
} | null>(null);

// Mock API async
const reserved = new Set(['admin', 'root', 'test']);
async function checkUsername(value: string): Promise<boolean> {
  await new Promise((r) => setTimeout(r, 500)); // latence simulée
  return !reserved.has(value.toLowerCase());
}

export function FormProvider({ children }: { children: React.ReactNode }) {
  
 const [state, dispatch] = useReducer(reducer, {
    username: { value: '', status: 'idle' },
    email: { value: '', status: 'idle' },
  });

  function change(name: string, value: string) {
    dispatch({ type: 'CHANGE', name, value });
  }

  async function validateField(name: string, validator: (v: string) => Promise<void>) {
    dispatch({ type: 'VALIDATING', name });
    try {
      const value = state[name]?.value ?? '';
      await validator(value);
      dispatch({ type: 'VALID', name });
    } catch (e: any) {
      dispatch({ type: 'ERROR', name, message: e.message ?? 'Erreur' });
    }
  }

  return (
    <FormCtx.Provider value={{ state, change, validateField }}>
      {children}
    </FormCtx.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormCtx);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}

type InputProps = {
  name: string;
  label: string;
  placeholder?: string;
  asyncValidator?: (value: string) => Promise<void>;
};

export function Input({ name, label, placeholder, asyncValidator }: InputProps) {

  const { state, change, validateField } = useForm();
  const field = state[name] ?? { value: '', status: 'idle' as const };

  return (
    <div style={{ marginBottom: 12, fontFamily: 'system-ui, sans-serif' }}>
      <label style={{ display: 'block', marginBottom: 4 }}>
        {label}
      </label>
      <input
        value={field.value}
        placeholder={placeholder}
        onChange={(e) => change(name, e.target.value)}
        onBlur={() => {
          if (!asyncValidator) return;
          validateField(name, asyncValidator);
        }}
        style={{ padding: '6px 8px', border: '1px solid #ccc', borderRadius: 4, width: '100%' }}
      />
      <small style={{ display: 'block', marginTop: 4, minHeight: 18 }}>
        {field.status === 'validating' && 'Validation en cours...'}
        {field.status === 'valid' && '✅ Valide'}
        {field.status === 'error' && `❌ ${field.error}`}
      </small>
    </div>
  );
}

// Exemple d’usage
export function FormExample() {
  return (
    <FormProvider>
      <Input
        name="username"
        label="Nom d’utilisateur"
        placeholder="ex: renaud"
        asyncValidator={async (v) => {
          if (v.length < 3) throw new Error('Au moins 3 caractères');
          const ok = await checkUsername(v);
          if (!ok) throw new Error('Nom d’utilisateur indisponible');
        }}
      />
      <Input
        name="email"
        label="Email"
        placeholder="ex: user@example.com"
        asyncValidator={async (v) => {
          if (!/^[\w.-]+@[\w.-]+\.\w+$/.test(v)) throw new Error('Email invalide');
        }}
      />
    </FormProvider>
  );
}