import { NextResponse } from 'next/server';
import { mockSuppliers, mockProducts, mockOrders } from '@/lib/mock-data';

export async function GET() {
  try {
    // Em desenvolvimento, usar dados mock
    if (process.env.NODE_ENV === 'development') {
      const totalSuppliers = mockSuppliers.length;
      const totalProducts = mockProducts.length;
      const totalOrders = mockOrders.length;
      const pendingOrders = mockOrders.filter(order => order.status === 'aguardando').length;
      
      // Calcular métricas financeiras mock
      const totalRevenue = mockOrders.reduce((sum, order) => {
        const product = mockProducts.find(p => p.id === order.produto_id);
        return sum + (product ? product.preco * order.quantidade : 0);
      }, 0);
      
      const lowStockProducts = mockProducts.filter(product => product.estoque < 10);
      
      const dashboardData = {
        totalSuppliers,
        totalProducts,
        totalOrders,
        pendingOrders,
        totalRevenue,
        totalCosts: totalRevenue * 0.7, // Mock: 70% do faturamento
        totalProfit: totalRevenue * 0.3, // Mock: 30% de lucro
        lowStockProducts,
        recentOrders: mockOrders.slice(0, 5) // 5 pedidos mais recentes
      };
      
      return NextResponse.json(dashboardData);
    }
    
    // TODO: Implementar queries reais do PostgreSQL quando em produção
    return NextResponse.json({ error: 'Production dashboard not implemented yet' }, { status: 501 });
    
  } catch (error) {
    console.error('Dashboard error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}