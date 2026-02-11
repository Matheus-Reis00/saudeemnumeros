'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import { Card } from '../ui/Card';
import { Button } from '../ui/Button';
import { Droplets, Info } from 'lucide-react';

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
  width: 100%;
  box-sizing: border-box;
  &:focus {
    outline: none;
    border-color: #0EA5E9;
    box-shadow: 0 0 0 4px #0EA5E920;
  }
`;

const ResultCard = styled.div`
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #bae6fd;
  padding: ${({ theme }) => theme.spacing.xl};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  margin-top: ${({ theme }) => theme.spacing.xl};
  text-align: center;
  animation: slideUp 0.4s ease-out;

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
`;

const BigNumber = styled.div`
  font-size: 4rem;
  font-weight: 900;
  color: #0369a1;
  line-height: 1;
  margin: 10px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
`;

const TipBox = styled.div`
  display: flex;
  gap: 12px;
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  margin-top: 24px;
  text-align: left;
  border: 1px solid #bae6fd;
`;

export default function WaterCalculator() {
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState<number | null>(null);

    const calculateWater = () => {
        const w = parseFloat(weight.replace(',', '.'));
        if (isNaN(w) || w <= 0) {
            alert('Por favor, insira um peso válido.');
            return;
        }
        // Fórmula: 35ml por kg
        setResult(Math.round(w * 35));
    };

    return (
        <Card>
            <Form>
                <FormGroup>
                    <Label htmlFor="weight">Seu Peso Atual (kg)</Label>
                    <Input
                        id="weight"
                        type="text"
                        inputMode="decimal"
                        placeholder="Ex: 70"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </FormGroup>
                <Button onClick={calculateWater} $fullWidth size="lg" style={{ backgroundColor: '#0EA5E9' }}>
                    Calcular Hidratação Diária
                </Button>
            </Form>

            {result && (
                <>
                    <ResultCard>
                        <Droplets size={40} color="#0EA5E9" />
                        <p style={{ fontSize: '1rem', color: '#0369a1', fontWeight: 600, marginTop: '12px' }}>
                            Sua meta diária ideal é:
                        </p>
                        <BigNumber>
                            {(result / 1000).toFixed(2)}
                            <span style={{ fontSize: '1.5rem', fontWeight: 700 }}>Litros</span>
                        </BigNumber>
                        <p style={{ color: '#075985', fontWeight: 500 }}>ou {result} ml por dia</p>

                        <TipBox>
                            <Info size={24} color="#0EA5E9" style={{ flexShrink: 0 }} />
                            <div>
                                <p style={{ fontWeight: 700, color: '#0369a1', fontSize: '0.9rem', marginBottom: '4px' }}>Dica do Especialista</p>
                                <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.5' }}>
                                    Aumente esse valor em 500ml para cada hora de exercício intenso ou em dias de calor extremo. Não espere sentir sede para beber água!
                                </p>
                            </div>
                        </TipBox>
                    </ResultCard>

                    <div style={{ marginTop: '32px', textAlign: 'center' }}>
                        <h4 style={{ marginBottom: '12px', fontSize: '1.1rem' }}>Quer beber mais água?</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                                💧 <strong>Ande com uma garrafa</strong> sempre por perto.
                            </div>
                            <div style={{ background: '#f8fafc', padding: '12px', borderRadius: '8px', fontSize: '0.8rem' }}>
                                📱 <strong>Use um app</strong> de lembrete diário.
                            </div>
                        </div>
                    </div>
                </>
            )}
        </Card>
    );
}
