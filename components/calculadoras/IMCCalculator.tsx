'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import AdsenseBanner from '../ads/AdsenseBanner';

const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
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
  color: ${({ theme }) => theme.colors.text};
`;

const Input = styled.input`
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid ${({ theme }) => theme.colors.border};
  font-size: 1rem;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.colors.primary}20;
  }

  &::placeholder {
    color: ${({ theme }) => theme.colors.textLight}80;
  }
`;

const ResultCard = styled.div<{ $color: string }>`
  background-color: ${({ $color }) => $color}10;
  border: 2px solid ${({ $color }) => $color};
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  animation: fadeIn 0.4s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const ResultValue = styled.div`
  font-size: 3rem;
  font-weight: 800;
  color: ${({ theme }) => theme.colors.text};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

const ResultLabel = styled.p`
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const InfoText = styled.p`
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textLight};
  line-height: 1.6;
`;

const CTA = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xl};
  padding: ${({ theme }) => theme.spacing.xl};
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.secondary}08 0%, ${({ theme }) => theme.colors.secondary}15 100%);
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
  border: 1px solid ${({ theme }) => theme.colors.secondary}20;
`;

export default function IMCCalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<{ value: number; label: string; color: string; info: string } | null>(null);

  const calculateIMC = () => {
    // Sanitização simples para permitir vírgula ou ponto
    const w = parseFloat(weight.toString().replace(',', '.'));
    const h = parseFloat(height.toString().replace(',', '.'));

    if (isNaN(w) || isNaN(h) || w <= 0 || h <= 0) {
      alert('Por favor, insira valores válidos para peso e altura.');
      return;
    }

    // Se a altura for inserida em cm (ex: 175), converte para metros (1.75)
    const heightInMeters = h > 3 ? h / 100 : h;
    const imc = w / (heightInMeters * heightInMeters);

    let label = '';
    let color = '';
    let info = '';

    if (imc < 18.5) {
      label = 'Abaixo do peso';
      color = '#3B82F6'; // Blue
      info = 'Seu peso está abaixo do recomendado. É importante buscar orientação nutricional para um ganho de peso saudável.';
    } else if (imc >= 18.5 && imc < 24.9) {
      label = 'Peso Normal';
      color = '#10B981'; // Green
      info = 'Parabéns! Você está na faixa de peso considerada saudável pela OMS. Continue mantendo hábitos de vida ativos.';
    } else if (imc >= 25 && imc < 29.9) {
      label = 'Sobrepeso';
      color = '#F59E0B'; // Amber
      info = 'Atenção. Você está levemente acima do peso ideal. Pequenos ajustes na dieta e rotina podem fazer grande diferença.';
    } else if (imc >= 30 && imc < 34.9) {
      label = 'Obesidade Grau I';
      color = '#EF4444'; // Red
      info = 'Nível de alerta. O peso atual pode estar sobrecarregando sua saúde. Considere consultar um especialista.';
    } else if (imc >= 35 && imc < 39.9) {
      label = 'Obesidade Grau II';
      color = '#991B1B'; // Dark Red
      info = 'Nível de risco elevado. É altamente recomendável buscar acompanhamento médico para reduzir riscos de doenças.';
    } else {
      label = 'Obesidade Grau III';
      color = '#7F1D1D'; // Maroon
      info = 'Risco severo à saúde. Busque suporte multiprofissional para traçar um plano de emagrecimento seguro.';
    }

    setResult({ value: parseFloat(imc.toFixed(1)), label, color, info });
  };

  return (
    <Card>
      <Form>
        <FormGroup>
          <Label htmlFor="weight">Seu Peso (kg)</Label>
          <Input
            id="weight"
            type="text"
            inputMode="decimal"
            placeholder="Ex: 75.5"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="height">Sua Altura (m ou cm)</Label>
          <Input
            id="height"
            type="text"
            inputMode="decimal"
            placeholder="Ex: 1.75 ou 175"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </FormGroup>
        <Button onClick={calculateIMC} $fullWidth size="lg">Calcular meu IMC</Button>
      </Form>

      {result && (
        <>
          <ResultCard $color={result.color}>
            <p style={{ fontSize: '0.9rem', color: '#6B7280', fontWeight: 500 }}>Resultado</p>
            <ResultValue>{result.value}</ResultValue>
            <ResultLabel style={{ color: result.color }}>{result.label}</ResultLabel>
            <InfoText style={{ marginTop: '12px' }}>{result.info}</InfoText>
          </ResultCard>

          <AdsenseBanner label="Recomendação" height="150px" />

          <CTA>
            <h4 style={{ marginBottom: '8px', color: '#111827' }}>Pronto para mudar seus números?</h4>
            <p style={{ fontSize: '0.9rem', color: '#4B5563', marginBottom: '16px' }}>
              Baixe nosso guia gratuito com os 7 passos para sair do sedentarismo e perder peso com saúde.
            </p>
            <Button variant="secondary" size="md">Baixar Guia Grátis</Button>
          </CTA>
        </>
      )}
    </Card>
  );
}
