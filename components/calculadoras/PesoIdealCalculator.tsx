'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';

import { Tooltip } from '../ui/Tooltip';
import { Info } from 'lucide-react';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.xs};
`;

const Label = styled.label`
  font-weight: 600;
  font-size: 0.9rem;
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const Select = styled.select`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }
`;

const ResultGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  margin-top: ${({ theme }) => theme.spacing.xl};
  animation: fadeIn 0.4s ease-out;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.mobile}) {
    grid-template-columns: 1fr;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }
`;

const ResultCard = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 2px solid ${({ theme }) => theme.colors.border};
  padding: ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormulaName = styled.p`
  font-size: 0.75rem;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.textLight};
  font-weight: 700;
  margin: 0;
`;

const WeightValue = styled.div`
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.primary};
`;

const RangeCard = styled.div`
  grid-column: 1 / -1;
  background-color: ${({ theme }) => theme.colors.primary}10;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing.md};
`;

export default function PesoIdealCalculator() {
  const [gender, setGender] = useState('male');
  const [height, setHeight] = useState('');
  const [results, setResults] = useState<{ devine: number; robinson: number; hamwi: number; rangeLow: number; rangeHigh: number } | null>(null);

  const calculateIdealWeight = () => {
    const h = parseFloat(height);
    if (!h || h <= 0) {
      alert('Por favor, insira uma altura válida.');
      return;
    }

    // A maioria das fórmulas usa polegadas acima de 5 pés (152.4 cm)
    const inchesOver5ft = (h - 152.4) / 2.54;

    // 1. Fórmula de Devine (Padrão ouro clínico)
    let devine = gender === 'male' ? 50 + 2.3 * inchesOver5ft : 45.5 + 2.3 * inchesOver5ft;

    // 2. Fórmula de Robinson (Atualização médica)
    let robinson = gender === 'male' ? 52 + 1.9 * inchesOver5ft : 49 + 1.7 * inchesOver5ft;

    // 3. Fórmula de Hamwi (Média popular)
    let hamwi = gender === 'male' ? 48 + 2.7 * inchesOver5ft : 45.5 + 2.2 * inchesOver5ft;

    // 4. Faixa Saudável baseada no IMC (Padrão OMS)
    const hMeters = h / 100;
    const rangeLow = 18.5 * (hMeters * hMeters);
    const rangeHigh = 24.9 * (hMeters * hMeters);

    setResults({
      devine: Math.round(devine),
      robinson: Math.round(robinson),
      hamwi: Math.round(hamwi),
      rangeLow: Math.round(rangeLow),
      rangeHigh: Math.round(rangeHigh)
    });
  };

  return (
    <Card>
      <Form>
        <FormGroup>
          <Label htmlFor="gender">Seu Sexo</Label>
          <Select id="gender" value={gender} onChange={(e) => setGender(e.target.value)}>
            <option value="male">Masculino</option>
            <option value="female">Feminino</option>
          </Select>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="height">Sua Altura (cm)</Label>
          <Input id="height" type="number" placeholder="Ex: 175" value={height} onChange={(e) => setHeight(e.target.value)} />
        </FormGroup>
        <Button onClick={calculateIdealWeight} $fullWidth size="lg">Calcular Peso Ideal</Button>
      </Form>

      {results && (
        <ResultGrid>
          <ResultCard>
            <div style={{ marginBottom: '8px' }}>
              <Tooltip content="Criada em 1974, é a fórmula mais utilizada por médicos para calcular doses de medicamentos e o peso ideal teórico.">
                <FormulaName>Fórmula de Devine</FormulaName>
                <Info size={14} color="#6B7280" />
              </Tooltip>
            </div>
            <WeightValue>{results.devine}kg</WeightValue>
          </ResultCard>
          <ResultCard>
            <div style={{ marginBottom: '8px' }}>
              <Tooltip content="Uma revisão da fórmula de Devine feita em 1983, visando maior precisão estatística para a população em geral.">
                <FormulaName>Fórmula de Robinson</FormulaName>
                <Info size={14} color="#6B7280" />
              </Tooltip>
            </div>
            <WeightValue>{results.robinson}kg</WeightValue>
          </ResultCard>

          <RangeCard>
            <p style={{ fontSize: '0.9rem', fontWeight: 600, color: '#4B5563', marginBottom: '8px' }}>
              Faixa de Peso Saudável (OMS)
            </p>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: '#10B981' }}>
              {results.rangeLow}kg – {results.rangeHigh}kg
            </div>
            <p style={{ marginTop: '16px', fontSize: '0.85rem', color: '#6B7280', maxWidth: '400px', margin: '16px auto 0' }}>
              Diferentes fórmulas podem sugerir valores distintos. A faixa da OMS é a mais utilizada por profissionais de saúde.
            </p>
            <Button variant="secondary" style={{ marginTop: '24px' }}>Receber Plano Alimentar Grátis</Button>
          </RangeCard>
        </ResultGrid>
      )}
    </Card>
  );
}
